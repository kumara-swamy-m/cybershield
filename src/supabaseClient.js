// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Missing Supabase env vars. Check .env.local");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,       // <-- keep session after refresh
    autoRefreshToken: true,     // <-- refresh tokens automatically
    detectSessionInUrl: true,   // <-- handle OAuth redirects properly
  },
});
