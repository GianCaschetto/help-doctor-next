import { SupabaseContextProvider } from "../context/supabase";
import Login from "../components/auth/Login";

export default function Home() {
  return (
    <SupabaseContextProvider>
      <Login />
    </SupabaseContextProvider>
  );
}
