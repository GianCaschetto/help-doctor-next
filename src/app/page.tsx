"use client";
import { useSupabase } from "./context/supabase";
import SignUp from "../components/auth/SignUp";
import DashboardComponent from "../components/Dashboard";

export default function Home() {
  const { user } = useSupabase();

  return !user ? <SignUp /> : <DashboardComponent user={user} />;
}
