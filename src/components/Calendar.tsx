"use client";
import { IEvent } from "@/types";
import { Button, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import CalendarHeatMap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

type Props = {
  events: IEvent[];
};

export default function Calendar({ events }: Props) {
  let yearly = dayjs().subtract(365, "days").format("YYYY-MM-DD");
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
        values={[{ date: "2023-01-01" }]}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `primary opacity-${value.count}`;
        }}
      />
    </Grid>
  );
}
