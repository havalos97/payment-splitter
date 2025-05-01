import { createClient } from '@supabase/supabase-js'

export const useSupabaseClient = () => {
  const config = useRuntimeConfig();
  
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseAnonKey,
  );

  return supabase;
}
