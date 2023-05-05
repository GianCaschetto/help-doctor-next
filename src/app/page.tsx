"use client";
import { useSupabase } from "./context/supabase";
import SignUp from "../components/auth/SignUp";
import { useEffect, useState } from "react";
import DashboardComponent from "../components/Dashboard";

export default function Home() {
  const { supabase, user, isLoggedIn } = useSupabase();

  return !isLoggedIn ? <SignUp /> : <DashboardComponent user={user} />;
}
