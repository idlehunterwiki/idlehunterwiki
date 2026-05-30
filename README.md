# Idle Hunter Wiki

Community wiki for **Idle Hunter**, built with Next.js, TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
cp .env.example .env.local   # add Supabase keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Supabase (auth & admin)

1. Create a project at [supabase.com](https://supabase.com).
2. Copy URL and anon key to `.env.local`.
3. Run `supabase/schema.sql` in the SQL Editor.
4. See [supabase/README.md](supabase/README.md) for details.

**Routes:** `/sign-up`, `/login`, `/account`, `/admin` (admins only).

## Adding articles

Create a new `.md` file in `content/wiki/`:

```yaml
---
title: My article
description: Short summary for search and cards
category: game-modes
tags: [tag1, tag2]
featured: false
order: 10
updatedAt: "2026-05-29"
---

Your Markdown content...
```

Categories: `getting-started`, `heroes-classes`, `gear-items`, `gems`, `talents`, `hunting-dungeons`, `currencies`, `game-modes`.

## Production build

```bash
npm run build
npm start
```
