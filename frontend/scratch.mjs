import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function check() {
  const tables = ['profiles', 'projects', 'skills', 'experience', 'services', 'testimonials', 'site_content', 'contact_inquiries'];
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').limit(1);
    console.log(`Table ${table}:`, data ? `has ${data.length} rows` : `error: ${error?.message}`);
  }
}

check();
