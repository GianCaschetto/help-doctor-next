"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const Supabase = createContext<any>({});

function SupabaseContextProvider({ children }: any) {
  const [isLoggedIn, setLoggedin] = useState(false);
  const [user, setUser] = useState(null);

  // Create a single supabase client for interacting with your database
  const supabase = createClient(
    process.env.db_url ?? "",
    process.env.db_pwd ?? "",
  );

  useEffect(() => {
    supabase.auth.onAuthStateChange((event: any, session: any) => {
      if (session?.access_token) {
        setLoggedin(true);
        setUser(session.user);
        console.log("Usuario logueado");
      }
      if (!session?.access_token) {
        setLoggedin(false);
        console.log("Usuario deslogueado");
      }
    });
  }, []);

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

  return (
    <Supabase.Provider
      value={{ supabase, signup, signin, logout, user, isLoggedIn }}
    >
      {children}
    </Supabase.Provider>
  );
}

function useSupabase() {
  const context = useContext(Supabase);
  if (!context) {
    console.log("Hubo un error en supabase context");
    return "error";
  }
  return context;
}

export { SupabaseContextProvider, useSupabase };
