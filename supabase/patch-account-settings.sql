-- Kör efter schema.sql — notisinställningar + radera eget konto

alter table public.profiles
  add column if not exists email_notify_wiki boolean not null default true;

alter table public.profiles
  add column if not exists email_notify_replies boolean not null default true;

alter table public.profiles
  add column if not exists email_notify_newsletter boolean not null default false;

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
