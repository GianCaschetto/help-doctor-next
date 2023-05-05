"use client";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lighTheme } from "./theme/theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Navbar from "../components/Navbar/Navbar";
import { SupabaseContextProvider } from "./context/supabase";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);
  const switchTheme: any = () => {
    setIsDark(!isDark);
  };

  return (
    <html lang="en">
      <SupabaseContextProvider>
        <ThemeProvider theme={isDark ? darkTheme : lighTheme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssBaseline />
            <body>
              <Navbar switchTheme={switchTheme} />
              {children}
            </body>
          </LocalizationProvider>
        </ThemeProvider>
      </SupabaseContextProvider>
    </html>
  );
}
