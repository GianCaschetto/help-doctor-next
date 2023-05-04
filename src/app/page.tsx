"use client";
import { useSupabase } from "./context/supabase";
import SignUp from "./components/auth/SignUp";
import { useEffect, useState } from "react";
import DashboardComponent from "./components/Dashboard";

export default function Home() {
  const { supabase } = useSupabase();
  const [isLoggedIn, setLoggedin] = useState(false);

  const getSession = () => {
    supabase.auth.onAuthStateChange((event: any, session: any) => {
      if (session?.access_token) {
        setLoggedin(true);
      }
      if (!session?.access_token) {
        setLoggedin(false);
      }
    });
  };

  useEffect(() => {
    getSession();
  }, []);

  return (
    <>
      {!isLoggedIn ? <SignUp /> : <DashboardComponent />}
    </>
  );
}
