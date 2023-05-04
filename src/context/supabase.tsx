"use client";
import { createContext, useContext } from "react";
import { createClient } from "@supabase/supabase-js";

const Supabase = createContext<any>({});

function SupabaseContextProvider({ children }: any) {
  // Create a single supabase client for interacting with your database
  const supabase = createClient(
    "https://yilvkhwybmikwwusxcnt.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpbHZraHd5Ym1pa3d3dXN4Y250Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMxNjQ3NzEsImV4cCI6MTk5ODc0MDc3MX0.D_BTTCJl7RL9SxNJeDTjmghWaf7QifvZKThSqqihYMs",
  );

  const signup = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    return { data, error };
  };

  return (
    <Supabase.Provider value={{ supabase, signup }}>
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
