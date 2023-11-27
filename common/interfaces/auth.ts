import { User } from "@supabase/supabase-js";

export interface IAuthProvider {
  currentUser: User | null;
  loading: boolean;
}
