import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { IEvent } from "@/types";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useSupabase } from "@/app/context/supabase";

export default function MigraineForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { supabase, user } = useSupabase();
  const [value, setValue] = useState<Dayjs | null>(null);
  const [event, setEvent] = useState<IEvent>({
    pain: 0,
    user_id: undefined,
    date: undefined,
    created_at: undefined,
    updated_at: undefined,
    duration: 1,
    locations: "",
    symptomes: "",
    medications: "",
  });

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <form
            onSubmit={handleSubmit(async (formData: any) => {
              if (value) {
                const { data, error } = await supabase
                  .from("events")
                  .insert([
                    {
                      user_id: user?.id,
                      date: dayjs(value).format("YYYY-MM-DD"),
                      created_at: dayjs(user?.created_at).format("YYYY-MM-DD"),
                      updated_at: dayjs(user?.updated_at).format("YYYY-MM-DD"),
                      ...formData,
                    },
                  ]);
                reset();
                setValue(null);
                refreshPage();
                if (error) console.log(error);
                if (data) console.log(data);
              } else {
                alert("Please select a date");
              }
            })}
          >
            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              textAlign="center"
            >
              <Grid
                item
                xs={12}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  sx={{ mt: 2 }}
                  label="How many days did it last?"
                  variant="standard"
                  {...register("duration", { required: true })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  sx={{ mt: 2 }}
                  label="Pain level (0 to 10)"
                  variant="standard"
                  {...register("pain", { required: true, max: 10, min: 0 })}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  sx={{ mt: 2 }}
                  label="Symptomes"
                  variant="standard"
                  {...register("symptomes", { required: true })}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  sx={{ mt: 2 }}
                  label="Locations"
                  variant="standard"
                  {...register("locations", { required: true })}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  sx={{ mt: 2 }}
                  label="Medications"
                  variant="standard"
                  {...register("medications", { required: true })}
                />
              </Grid>

              <Grid item xs={12} textAlign="center">
                <Button
                  variant="outlined"
                  type="submit"
                  sx={{ mt: 2 }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
