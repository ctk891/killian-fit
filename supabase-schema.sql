create table if not exists public.killian_fit_snapshots (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.killian_fit_snapshots enable row level security;

create index if not exists killian_fit_snapshots_updated_at_idx
  on public.killian_fit_snapshots (updated_at desc);

create or replace function public.set_killian_fit_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_killian_fit_snapshots_updated_at on public.killian_fit_snapshots;

create trigger set_killian_fit_snapshots_updated_at
before update on public.killian_fit_snapshots
for each row
execute function public.set_killian_fit_updated_at();

drop policy if exists "Users can read their Killian Fit snapshot." on public.killian_fit_snapshots;
drop policy if exists "Users can create their Killian Fit snapshot." on public.killian_fit_snapshots;
drop policy if exists "Users can update their Killian Fit snapshot." on public.killian_fit_snapshots;

create policy "Users can read their Killian Fit snapshot."
on public.killian_fit_snapshots
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can create their Killian Fit snapshot."
on public.killian_fit_snapshots
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update their Killian Fit snapshot."
on public.killian_fit_snapshots
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
