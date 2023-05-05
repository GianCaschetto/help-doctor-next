import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { IEvent } from "@/types";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useSupabase } from "@/app/context/supabase";
type Props = {
  setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>;
};

export default function MigraineForm(
  { setEvents }: Props,
) {
  const { user } = useSupabase();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [value, setValue] = useState<Dayjs | null>(null);
  const [event, setEvent] = useState<IEvent>({
    user_id: undefined,
    date: undefined,
    duration: 1,
    locations: "",
    symptomes: "",
    medications: "",
  });

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <form
            onSubmit={handleSubmit((form: any) => {
              setEvent({
                user_id: user.id,
                date: dayjs(value).format("YYYY-MM-DD"),
                ...form,
              });
              console.log(event);
            })}
          >
            <DatePicker
              format="DD/MM/YYYY"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
            <TextField
              type="number"
              sx={{ mt: 2 }}
              label="How long did it last?"
              variant="outlined"
              {...register("duration", { required: true })}
            />
            <TextField
              type="number"
              sx={{ mt: 2 }}
              label="Evaluate your pain (0 to 10)"
              variant="outlined"
              {...register("pain", { required: true })}
            />
            <TextField
              sx={{ mt: 2 }}
              label="Symptomes"
              variant="outlined"
              {...register("symptomes", { required: true })}
            />
            <TextField
              sx={{ mt: 2 }}
              label="Location"
              variant="outlined"
              {...register("location", { required: true })}
            />
            <TextField
              sx={{ mt: 2 }}
              label="Medications"
              variant="outlined"
              {...register("medication", { required: true })}
            />
            <Button variant="outlined" type="submit" sx={{ mt: 2 }}>
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
