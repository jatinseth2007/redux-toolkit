import { createClient } from '@supabase/supabase-js';

/**
 * to generate the supabase client to interact with API
 * Jatin Seth
 */
export const supabaseClient = createClient(process.env.REACT_APP_API_BASE_URL, process.env.REACT_APP_PUBLIC_KEY);