import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://kjiopsoxkrzeickcmous.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqaW9wc294a3J6ZWlja2Ntb3VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzODIzMzMsImV4cCI6MjEwNDk1ODMzM30.q2aRUmoOHZiWpJiDPblsC7LOHak0gNTFtowoP1duwGc'
)
