"use client";

import { IAuthProvider } from "@/common/interfaces/auth";
import { supabase } from "@/services/supabase";
import { User } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<IAuthProvider>({
  currentUser: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setCurrentUser(session?.user ?? null);
      setLoading(false);
    });

    return subscription.unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
