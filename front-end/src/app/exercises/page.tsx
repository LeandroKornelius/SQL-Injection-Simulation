"use client";

import {
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface Exercise {
  id: number;
  name: string;
  description?: string;
}

export default function ExercisesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3333/exercises/search?value=${encodeURIComponent(
          searchTerm
        )}`
      );
      if (!res.ok) throw new Error("Erro ao buscar exercícios");

      const data = await res.json();
      setExercises(data);
    } catch (err) {
      console.error("Erro na busca:", err);
      alert("Erro ao buscar exercícios");
    } finally {
      setLoading(false);
    }
  };

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSearch}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Buscar"
              )}
            </Button>
          </div>
        </div>

        <div className="w-full space-y-2 pt-2">
          {exercises.length === 0 && !loading && (
            <Typography variant="body2" className="text-center">
              Nenhum exercício encontrado.
            </Typography>
          )}
          {exercises.map((exercise) => (
            <Paper key={exercise.id} className="p-2" elevation={2}>
              <Typography variant="body1" className="font-semibold">
                {exercise.name}
              </Typography>
              {exercise.description && (
                <Typography variant="body2">{exercise.description}</Typography>
              )}
            </Paper>
          ))}
        </div>
      </div>
    </div>
  );
}
