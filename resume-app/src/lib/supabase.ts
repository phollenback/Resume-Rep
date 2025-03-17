import { createClient } from '@supabase/supabase-js';

// Hardcode the values directly to ensure they're available
const supabaseUrl = 'https://owltoweesvngvtrngwqn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93bHRvd2Vlc3ZuZ3Z0cm5nd3FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMzA2ODYsImV4cCI6MjA1NzgwNjY4Nn0.yk8-BS46js4-DNyOKtiCn1pJ-Uqs44_BvZevyclXav4';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
}); 