-- Kör detta EN gång om /account säger "Could not load your profile"
-- (konton skapade innan triggern fanns saknar rad i profiles)

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

-- Fyll i alla befintliga auth-användare som saknar profil
insert into public.profiles (id, email, display_name)
select
  u.id,
  u.email,
  coalesce(
    u.raw_user_meta_data ->> 'display_name',
    split_part(coalesce(u.email, 'user'), '@', 1)
  )
from auth.users u
where not exists (
  select 1 from public.profiles p where p.id = u.id
);
