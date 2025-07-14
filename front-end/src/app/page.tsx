"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="grid justify-items-center w-72 p-6 border-2 border-gray-300 rounded-lg shadow-md">
        <span className="text-xl mb-4 text-center">Fit App</span>

        <div className="flex flex-col space-y-2 w-full">
          <div>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => router.push("/sign-up")}
            >
              Cadastrar
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => router.push("/exercises")}
            >
              Exercícios
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
