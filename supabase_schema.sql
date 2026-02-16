
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS TABLE (Mirrors auth.users for app-level data like roles)
create table public.users (
  id uuid references auth.users not null primary key,
  email text not null,
  role text default 'USER',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- POSTS TABLE
create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  content text not null, -- HTML/TipTap content
  excerpt text,
  featured_image text,
  published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  author_id uuid references public.users(id) not null
);

-- PROJECTS TABLE
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  description text not null,
  content text not null,
  tech_stack text not null,
  live_url text,
  github_url text,
  featured_image text,
  published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PROFILE TABLE (Site Owner Profile)
create table public.profile (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  bio text not null,
  avatar_url text,
  twitter text,
  github text,
  linkedin text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES (Optional but recommended, initially public for ease)
alter table public.users enable row level security;
alter table public.posts enable row level security;
alter table public.projects enable row level security;
alter table public.profile enable row level security;

-- Simple policies
-- Allow read access to everyone
create policy "Allow public read access" on public.posts for select using (true);
create policy "Allow public read access" on public.projects for select using (true);
create policy "Allow public read access" on public.profile for select using (true);
create policy "Allow public read access" on public.users for select using (true);

-- Allow write access only to authenticated users (admin logic handled in app, or refine this)
create policy "Allow authenticated insert" on public.posts for insert with check (auth.role() = 'authenticated');
create policy "Allow authenticated update" on public.posts for update using (auth.role() = 'authenticated');
create policy "Allow authenticated delete" on public.posts for delete using (auth.role() = 'authenticated');

create policy "Allow authenticated insert" on public.projects for insert with check (auth.role() = 'authenticated');
create policy "Allow authenticated update" on public.projects for update using (auth.role() = 'authenticated');
create policy "Allow authenticated delete" on public.projects for delete using (auth.role() = 'authenticated');

create policy "Allow authenticated insert" on public.profile for insert with check (auth.role() = 'authenticated');
create policy "Allow authenticated update" on public.profile for update using (auth.role() = 'authenticated');

create policy "Allow authenticated insert" on public.users for insert with check (auth.role() = 'authenticated');
create policy "Allow authenticated update" on public.users for update using (auth.role() = 'authenticated');
