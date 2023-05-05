import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { IEvent } from "@/types";
import { Button, Card, CardContent, Container, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSupabase } from "@/app/context/supabase";

export default function MigraineForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { supabase } = useSupabase();
  const [user, setUser] = useState<any>(null);
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

  const getSession = () => {
    supabase.auth.onAuthStateChange((event: any, session: any) => {
      if (session?.access_token) {
        setUser(session.user);
      }
    });
  };

  useEffect(() => {
    getSession();
  }, []);

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <form
            onSubmit={handleSubmit(async (form: any) => {
              const { data, error } = await supabase
                .from("events")
                .insert([
                  {
                    user_id: user?.id,
                    date: dayjs(value).format("YYYY-MM-DD"),
                    created_at: dayjs(user?.created_at).format("YYYY-MM-DD"),
                    updated_at: dayjs(user?.updated_at).format("YYYY-MM-DD"),
                    ...form,
                  },
                ]);
              reset();
              setValue(null);
              if (error) console.log(error);
              if (data) console.log(data);
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
              label="How many days did it last?"
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
              {...register("locations", { required: true })}
            />
            <TextField
              sx={{ mt: 2 }}
              label="Medications"
              variant="outlined"
              {...register("medications", { required: true })}
            />
            <Button
              variant="outlined"
              type="submit"
              sx={{ mt: 2 }}
            >
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
