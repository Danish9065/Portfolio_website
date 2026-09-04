-- This event-trigger helper only needs to run internally during DDL.
-- Prevent it from being exposed as a callable Data API RPC.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
