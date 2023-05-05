"use client";
import { useEffect } from "react";
import { useSupabase } from "@/app/context/supabase";
import { IEvent } from "@/types";
import { Button, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import CalendarHeatMap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

export default function Calendar() {
  let yearly = dayjs().subtract(365, "days").format("YYYY-MM-DD");
  const { supabase } = useSupabase();
  const [events, setEvents] = React.useState<IEvent[]>([]);
  const getDates = async () => {
    let { data, error } = await supabase
      .from("events")
      .select("date");
    return data;
  };
  useEffect(() => {
    getDates().then((data) => {
      setEvents(data);
    });
  }, []);
  console.log(events);
  return (
    <Grid item className="Calendar border" sx={{ p: 4 }}>
      <Grid
        container
        item
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5">Migraine</Typography>
      </Grid>
      <CalendarHeatMap
        startDate={yearly}
        showWeekdayLabels
        values={events}
      />
    </Grid>
  );
}
