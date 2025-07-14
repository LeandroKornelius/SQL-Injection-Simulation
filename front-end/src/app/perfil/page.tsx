"use client";

import { Button, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken, getUser } from "../utils/auth";

interface Exercise {
  name: string;
  sets: number;
  repetitions: number;
  weight: number;
}

interface Workout {
  id: number;
  name: string;
  weekDay: string;
  description: string;
  exercises: Exercise[];
}

export default function MyWorkoutPage() {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const user = getUser();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = getToken();
        const res = await fetch("http://localhost:3333/workouts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Falha ao buscar treinos");

        const data = await res.json();
        console.log("Workouts:", data);
        setWorkouts(data);
      } catch (error) {
        console.error("Erro ao buscar treinos:", error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="flex min-h-screen justify-center items-start py-6">
      <div className="grid justify-items-center w-full max-w-md space-y-6">
        <Typography variant="h5" className="text-center font-semibold">
          Salve {user?.name || "atleta"}!
        </Typography>

        <span className="text-3xl font-bold text-center">Meus Treinos</span>

        {workouts.length === 0 && (
          <Typography variant="body1" className="text-center">
            Nenhum treino encontrado.
          </Typography>
        )}

        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-md space-y-3"
          >
            <Typography variant="h6">{workout.name}</Typography>
            <Typography variant="body2">Hoje é {workout.weekDay}</Typography>
            <Typography variant="body2">{workout.description}</Typography>

            <div className="w-full space-y-2 pt-2">
              {workout.exercises.map((exercise, i) => (
                <Paper key={i} className="p-2" elevation={2}>
                  <Typography variant="body1">{exercise.name}</Typography>
                  <Typography variant="body2">
                    Séries: {exercise.sets} | Repetições: {exercise.repetitions}{" "}
                    | Carga: {exercise.weight} kg
                  </Typography>
                </Paper>
              ))}
            </div>
          </div>
        ))}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => router.push("/payment")}
        >
          Bora pagar?
        </Button>
      </div>
    </div>
  );
}
