import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://gimhhlqqwtjxdctatkqu.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpbWhobHFxd3RqeGRjdGF0a3F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTE2MTUsImV4cCI6MTk4Mzc2NzYxNX0.Y8AOrzelig81wpecDzQJzaa1p5DBo6PH5KaKfwMNXAc";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from("video").select("*");
    }
  };
}
