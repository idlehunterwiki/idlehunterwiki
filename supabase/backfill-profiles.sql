-- Kör EN gång om du redan har konton i auth.users men saknar rader i profiles
-- (t.ex. schema kördes inte klart första gången)

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
