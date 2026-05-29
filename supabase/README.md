# Supabase — auth & roles

## 1. Create a project

1. Go to [supabase.com](https://supabase.com) and create a project.
2. Under **Project Settings → API**, copy **Project URL** and the **anon public** key.
3. Create `.env.local` in the project root (see `.env.example`).

## 2. Run the database schema

1. Open **SQL Editor** in the Supabase Dashboard.
2. Paste the full contents of `schema.sql` and run it.

The script is **safe to run more than once** (it skips objects that already exist).

If you see `type "user_role" already exists`, you ran an older copy of the file — pull the latest `schema.sql` and run it again.

If **My account** says it could not load your profile, run `patch-ensure-profile.sql` once (creates missing profile rows for existing users).

You can also run `backfill-profiles.sql` alone if you only need the data fix without the app function.

For **account settings** (email notification toggles, delete account), run `patch-account-settings.sql` once.

## 3. Auth settings

Under **Authentication → URL Configuration**:

| Field | Value (local dev) |
|-------|-------------------|
| Site URL | `http://localhost:3000` |
| Redirect URLs | `http://localhost:3000/auth/callback` |

For easier testing, you can disable **Confirm email** under **Authentication → Providers → Email** until you go live.

## 4. First administrator

Sign up at `/sign-up`, then run in SQL Editor:

```sql
update public.profiles
set role = 'admin'
where email = 'your@email.com';
```

After that, you can grant admin to others under **Admin → Users** on the wiki.

## Roles

| Role | Can |
|------|-----|
| **user** | Read the wiki, sign in, change display name |
| **admin** | All of the above + admin panel, change other users' roles |
