import { createClient } from '@supabase/supabase-js'

const supabaseURL = 'https://uphmouybhsbcyfhegqub.supabase.co'
const supabaseKEY = process.env.SUPABASE_KEY

export const supabase = createClient(supabaseURL, supabaseKEY)