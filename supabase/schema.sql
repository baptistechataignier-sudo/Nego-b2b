-- NégoMaster — Supabase schema
-- Run this once in the Supabase SQL Editor: https://supabase.com/dashboard/project/kjiopsoxkrzeickcmous/sql

-- 1. Profiles (one row per user)
create table if not exists public.profiles (
  id       uuid references auth.users(id) on delete cascade primary key,
  name     text not null,
  email    text unique not null,
  is_admin boolean not null default false,
  created_at timestamptz default now()
);

-- 2. Progress (game state per user)
create table if not exists public.user_progress (
  user_id    uuid references public.profiles(id) on delete cascade primary key,
  state      jsonb not null default '{}',
  updated_at timestamptz default now()
);

-- 3. Row Level Security
alter table public.profiles      enable row level security;
alter table public.user_progress enable row level security;

-- All authenticated users can read all profiles (needed for admin dashboard)
create policy "profiles_read"   on public.profiles for select to authenticated using (true);
create policy "profiles_insert" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "profiles_update" on public.profiles for update to authenticated using (auth.uid() = id);

-- All authenticated users can read all progress (admin dashboard)
create policy "progress_read"   on public.user_progress for select to authenticated using (true);
create policy "progress_insert" on public.user_progress for insert to authenticated with check (auth.uid() = user_id);
create policy "progress_update" on public.user_progress for update to authenticated using (auth.uid() = user_id);
