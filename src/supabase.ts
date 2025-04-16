import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tvlexvisduuroftjfgij.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2bGV4dmlzZHV1cm9mdGpmZ2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0Njk0NjEsImV4cCI6MjA2MDA0NTQ2MX0.2qj3qZvlY9WgdDjiGqksuu_9TLhfeoP4XFGwApok5fE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    db: {
        schema: 'public',
    },
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});