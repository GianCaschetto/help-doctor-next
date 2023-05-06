"use client";
import { createContext, useContext } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { AuthChangeEvent, AuthSession, User } from "@supabase/supabase-js";
const SupabaseContext = createContext<any>({});

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.db_url ?? "",
  process.env.db_pwd ?? "",
);

function SupabaseContextProvider({ children }: {
  children: React.ReactNode;
}) {
  const logout = async () => await supabase.auth.signOut();
  const signin = async (
    { email, password }: { email: string; password: string },
  ) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    return { data, error };
  };

  const signup = async (
    { email, password }: { email: string; password: string },
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    return { data, error };
  };
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange(
      (event: any, session: any) => {
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      },
    );
  }, []);
  return (
    <SupabaseContext.Provider
      value={{ supabase, signup, signin, logout, user }}
    >
      {children}
    </SupabaseContext.Provider>
  );
}

function useSupabase() {
  const context = useContext(SupabaseContext);
  return context;
}

export { SupabaseContextProvider, useSupabase };
