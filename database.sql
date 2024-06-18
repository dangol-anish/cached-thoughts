-- journal
create table journal(
    journal_id bigint generated by default as identity primary key,
    user_id uuid references auth.users not null,
    journal_title varchar(255),
    highlight_of_the_day text not null,
    mood varchar(255) not null,
    inserted_at timestamp with time zone default timezone('utc':: text, now()) not null
);

-- added is_deleted column
alter table journal
add column is_deleted boolean default false not null;

-- policy
alter table journal enable row level security;
create policy "Users can create Journals." on journal for
    insert with check (auth.uid() = user_id);
create policy "Users can view their own Journals." on journal for
    select using ((select auth.uid()) = user_id);
create policy "Users can update their own Journals." on journal for
    update using ((select auth.uid()) = user_id);
create policy "Users can delete their own Journals." on journal for
    delete using ((select auth.uid()) = user_id);
