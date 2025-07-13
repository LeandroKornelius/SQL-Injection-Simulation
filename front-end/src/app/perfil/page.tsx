"use client";

import { Button, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function MyWorkoutPage() {
  const router = useRouter();

  const mockUser = {
    id: 1,
    name: "Vitinho",
  };

  const mockWorkouts = [
    {
      id: 1,
      name: "Peito",
      weekDay: "Segunda",
      description: "Peitão batendo no teto",
      exercises: [
        {
          id: 1,
          name: "Supino Reto na Barra",
          sets: 4,
          repetitions: 8,
          weight: 80,
        },
        {
          id: 2,
          name: "Supino Inclinado com Halteres",
          sets: 3,
          repetitions: 10,
          weight: 30,
        },
      ],
    },
    {
      id: 2,
      name: "Infelizmente Leg Day",
      weekDay: "Quarta",
      description: "Foco no Quadriceps do Pai.",
      exercises: [
        {
          id: 3,
          name: "Agachamento Livre",
          sets: 4,
          repetitions: 8,
          weight: 120,
        },
        {
          id: 4,
          name: "Cadeira Extensora",
          sets: 3,
          repetitions: 12,
          weight: 40,
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen justify-center items-start py-6">
      <div className="grid justify-items-center w-full max-w-md space-y-6">
        <Typography variant="h5" className="text-center font-semibold">Salve {mockUser.name}!</Typography>

        <span className="text-3xl font-bold text-center">Meus Treinos</span>

        {mockWorkouts.map((workout) => (
          <div
            key={workout.id}
            className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-md space-y-3"
          >
            <Typography variant="h6">{workout.name}</Typography>
            <Typography variant="body2">
              Esqueceu já? Hoje é {workout.weekDay}
            </Typography>
            <Typography variant="body2">{workout.description}</Typography>

            <div className="w-full space-y-2 pt-2">
              {workout.exercises.map((exercise) => (
                <Paper key={exercise.id} className="p-2" elevation={2}>
                  <Typography variant="body1">{exercise.name}</Typography>
                  <Typography variant="body2">
                    Séries: {exercise.sets} | Repetições: {exercise.repetitions} | Carga: {exercise.weight} kg
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
