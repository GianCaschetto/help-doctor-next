"use client";
import { Container, Grid, Typography } from "@mui/material";
import Calendar from "./Calendar";
import MigraineForm from "./MigraineForm";

export default function DashboardComponent({ user }: { user: any }) {
  return (
    <Container>
      <Typography textAlign="center" variant="h2">Dashboard</Typography>
      <Grid>
        <Typography component="h4" textAlign="center">
        </Typography>
        <Calendar />
        <MigraineForm />
      </Grid>
    </Container>
  );
}
