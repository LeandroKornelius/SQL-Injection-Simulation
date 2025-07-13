"use client";

import { Button, Paper, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ExercisesPage() {
  const router = useRouter();

  const mockExercises = [
    "Abdominal",
    "Flexão de braço",
    "Agachamento",
    "Corrida estacionária",
    "Prancha",
  ];

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="grid justify-items-center w-80 p-6 border-2 border-gray-300 rounded-lg shadow-md space-y-4">
        <span className="text-2xl font-semibold text-center">Exercícios</span>

        <div className="w-full space-y-2">
          <div>
            <TextField
              label="Buscar exercício"
              variant="outlined"
              fullWidth
              size="small"
            />
          </div>
          <div>
            <Button variant="contained" color="primary" fullWidth>
              Buscar
            </Button>
          </div>
        </div>

        <div className="w-full space-y-2 pt-2">
          {mockExercises.map((exercise, index) => (
            <Paper key={index} className="p-2" elevation={2}>
              <Typography variant="body1">{exercise}</Typography>
            </Paper>
          ))}
        </div>
      </div>
    </div>
  );
}
