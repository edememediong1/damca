create extension if not exists pgcrypto;
create table if not exists public.site_content (key text primary key check (key in ('projects','programs','testimonials','roadmap','mediaConfig')), value jsonb not null, updated_at timestamptz not null default now());
create table if not exists public.contacts (id text primary key default gen_random_uuid()::text, name text not null, email text not null, phone text, company text not null default 'Direct Client', budget text, project_type text, description text not null, status text not null default 'new' check (status in ('new','contacted','in-discussion','booked','archived')), notes text, created_at timestamptz not null default now());
create table if not exists public.students (id text primary key default gen_random_uuid()::text, full_name text not null, email text not null, phone text not null, program_id text not null, program_title text not null, payment_preference text not null default 'pending' check (payment_preference in ('paid','installment','pending','scholarship')), enrollment_status text not null default 'applied' check (enrollment_status in ('applied','onboarding','active','graduated','dropped')), progress_percentage integer not null default 0 check (progress_percentage between 0 and 100), assigned_mentor text, showreel_url text, notes text, tuition_amount text, created_at timestamptz not null default now());
create index if not exists contacts_created_at_idx on public.contacts (created_at desc);
create index if not exists contacts_status_idx on public.contacts (status);
create index if not exists students_created_at_idx on public.students (created_at desc);
create index if not exists students_status_idx on public.students (enrollment_status);
alter table public.site_content enable row level security;
alter table public.contacts enable row level security;
alter table public.students enable row level security;
-- No browser policies: the server owns all data access and keeps the service key private.
