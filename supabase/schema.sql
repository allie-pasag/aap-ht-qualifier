-- Enable UUID extension if not enabled (gen_random_uuid())
create extension if not exists "uuid-ossp";

-- Create leads table matching the specification
create table if not exists public.leads (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    first_name text not null,
    last_name text not null,
    email text not null,
    offer_status text,
    most_money text,
    solved_for_someone text,
    converting text,
    infrastructure text,
    new_or_improve text,
    what_they_have text[],
    urgency text,
    client_bucket text,
    client_type text,
    ai_result_headline text,
    ai_result_summary text,
    ai_result_diagnosis text,
    price_anchor text,
    ghl_synced boolean default false not null
);

-- Enable Row Level Security (RLS)
alter table public.leads enable row level security;

-- Policy: Allow public inserts so anyone can submit the form
create policy "Allow public inserts" on public.leads
    for insert
    to anon
    with check (true);

-- Policy: Deny public reads (no SELECT policy defined for anon)
-- Note: In Supabase, enabling RLS without defining a SELECT policy defaults to denying all SELECT operations for non-admin roles (e.g. anon / public). 
-- Elevated/server-side operations will use the Service Role Key which bypasses RLS.
