"use client";
import { Container, Grid, Typography } from "@mui/material";
import Calendar from "./Calendar";
import { IEvent } from "../types";
import { useState } from "react";
import MigraineForm from "./MigraineForm";

export default function DashboardComponent({ user }: { user: any }) {
  const [events, setEvents] = useState<Array<IEvent>>([]);
  return (
    <Container>
      <Typography textAlign="center" variant="h2">Dashboard</Typography>
      <Grid>
        <Typography component="h4" textAlign="center">
          {/* Welcome {user.email} */}
        </Typography>
        <Calendar events={events} />
        <MigraineForm setEvents={setEvents} />
      </Grid>
    </Container>
  );
}
