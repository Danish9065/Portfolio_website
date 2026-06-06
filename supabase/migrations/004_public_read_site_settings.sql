create policy "Public read site settings"
on site_settings
for select
using (true);
