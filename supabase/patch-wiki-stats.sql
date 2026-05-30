-- Public wiki stats (member count) for the home page.
-- Safe to re-run. Run once if your DB was created before this was added to schema.sql.

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
