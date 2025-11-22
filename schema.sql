-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Goals Table
create table goals (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  progress integer default 0,
  color text default 'bg-blue-500',
  owner_id uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Initiatives Table
create table initiatives (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  goal_id uuid references goals(id) on delete cascade,
  status text default 'todo',
  start_date date,
  end_date date,
  owner_id uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Epics Table
create table epics (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  initiative_id uuid references initiatives(id) on delete cascade,
  status text default 'todo',
  priority text default 'medium',
  owner_id uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Stories Table
create table stories (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  epic_id uuid references epics(id) on delete cascade,
  status text default 'todo',
  priority text default 'medium',
  points integer default 1,
  assignee_id uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Profiles Table (Public User Info)
create table profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone
);

-- Enable Row Level Security (RLS)
alter table goals enable row level security;
alter table initiatives enable row level security;
alter table epics enable row level security;
alter table stories enable row level security;
alter table profiles enable row level security;

-- Create Policies (Allow all for now for simplicity, or authenticated only)
create policy "Enable read access for all users" on goals for select using (true);
create policy "Enable insert for authenticated users only" on goals for insert with check (auth.role() = 'authenticated');
create policy "Enable update for authenticated users only" on goals for update using (auth.role() = 'authenticated');

-- (Repeat similar policies for other tables or use a broad policy for MVP)
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
