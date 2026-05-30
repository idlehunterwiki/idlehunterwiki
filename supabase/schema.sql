-- Idle Hunter Wiki — database schema (safe to re-run)
-- Paste in Supabase Dashboard → SQL Editor → Run

-- Roller (skip if already created)
do $$ begin
  create type public.user_role as enum ('user', 'admin');
exception
  when duplicate_object then null;
end $$;

-- Profiler (kopplade till auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text,
  role public.user_role not null default 'user',
  email_notify_wiki boolean not null default true,
  email_notify_replies boolean not null default true,
  email_notify_newsletter boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles
  add column if not exists email_notify_wiki boolean not null default true;

alter table public.profiles
  add column if not exists email_notify_replies boolean not null default true;

alter table public.profiles
  add column if not exists email_notify_newsletter boolean not null default false;

create index if not exists profiles_role_idx on public.profiles (role);

-- Ny användare → skapa profil
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data ->> 'display_name',
      split_part(coalesce(new.email, 'user'), '@', 1)
    )
  )
  on conflict (id) do update set
    email = excluded.email,
    display_name = coalesce(
      public.profiles.display_name,
      excluded.display_name
    );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Skapa profil för befintliga inloggade användare (saknas om de registrerades före triggern)
create or replace function public.ensure_profile()
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  result public.profiles;
  auth_user auth.users;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  select * into auth_user from auth.users where id = auth.uid();
  if not found then
    raise exception 'User not found';
  end if;

  insert into public.profiles (id, email, display_name)
  values (
    auth_user.id,
    auth_user.email,
    coalesce(
      auth_user.raw_user_meta_data ->> 'display_name',
      split_part(coalesce(auth_user.email, 'user'), '@', 1)
    )
  )
  on conflict (id) do update set
    email = coalesce(excluded.email, public.profiles.email);

  select * into result from public.profiles where id = auth.uid();
  return result;
end;
$$;

grant execute on function public.ensure_profile() to authenticated;

create or replace function public.delete_own_account()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  delete from auth.users where id = auth.uid();
end;
$$;

grant execute on function public.delete_own_account() to authenticated;

-- Endast admin får ändra roll
create or replace function public.enforce_role_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.role is distinct from new.role then
    if not exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    ) then
      raise exception 'Endast administratörer kan ändra roller';
    end if;
  end if;
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists enforce_role_change on public.profiles;
create trigger enforce_role_change
  before update on public.profiles
  for each row execute function public.enforce_role_change();

-- RLS
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_select_admin" on public.profiles;
create policy "profiles_select_admin"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "profiles_update_admin" on public.profiles;
create policy "profiles_update_admin"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Public stats for the wiki home page (aggregate counts only)
create or replace function public.get_public_wiki_stats()
returns json
language sql
stable
security definer
set search_path = public
as $$
  select json_build_object(
    'member_count', (select count(*)::int from public.profiles)
  );
$$;

revoke all on function public.get_public_wiki_stats() from public;
grant execute on function public.get_public_wiki_stats() to anon, authenticated;

-- Första admin: byt e-post efter att du registrerat dig
-- update public.profiles set role = 'admin' where email = 'din@epost.se';
