import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ffdrelobsoxvlzvtnlu.supabase.co" // <-- Vérifie bien le "zv"
const supabaseAnonKey = "sb_publishable_fB1xlTBSfdsdJwSZFp5syg_G7JJZi-3"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)