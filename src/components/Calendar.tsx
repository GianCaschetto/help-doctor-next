"use client";
import { useEffect } from "react";
import { useSupabase } from "@/app/context/supabase";
import { IEvent } from "@/types";
import { Button, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import CalendarHeatMap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "../styles/Calendar.module.css";

export default function Calendar() {
  const yearly = dayjs().subtract(365, "days").format("YYYY-MM-DD");
  const { supabase } = useSupabase();
  const [events, setEvents] = React.useState<IEvent[]>([]);
  const getDates = async () => {
    let { data, error } = await supabase
      .from("events")
      .select("date, pain");
    return data;
  };
  useEffect(() => {
    getDates().then((data) => {
      setEvents(data);
    });
  }, []);

  return (
    <Grid item className="Calendar border" sx={{ p: 4 }}>
      <Grid
        container
        item
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
      </Grid>
      <CalendarHeatMap
        startDate={yearly}
        showWeekdayLabels
        values={events}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-scale-${value.pain}`;
        }}
      />
    </Grid>
  );
}
