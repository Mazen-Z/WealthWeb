import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://gkkjohvkhswcqtwegrkw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdra2pvaHZraHN3Y3F0d2Vncmt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwODAxMTAsImV4cCI6MjAyOTY1NjExMH0.m6oY0Kle0DMuVA_9PaqArVrL6PTjIzqEjMX3O6mUHhw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
