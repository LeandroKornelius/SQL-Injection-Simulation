"use client";

import { Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { setToken, setUser } from "../utils/auth";

const initialValues = { email: "", password: "" };

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="grid justify-items-center w-72 p-6 border-2 border-gray-300 rounded-lg shadow-md">
        <span className="text-xl mb-4 text-center">Login</span>
        <Formik
          initialValues={initialValues}
          onSubmit={async (initialValues) => {
            try {
              const res = await fetch("http://localhost:3333/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(initialValues),
              });

              const data = await res.json();
              console.log("Resposta da API:", res.status, data);

              if (!res.ok) {
                throw new Error(data.message || "Login falhou");
              }

              const { access_token, user } = data;

              setToken(access_token);
              setUser(user);

              alert("Login realizado com sucesso!");
              router.push("/perfil");
            } catch (err) {
              console.error("Erro no login:", err);
              alert("Erro no login");
            }
          }}
        >
          {(props) => (
            <Form
              onSubmit={props.handleSubmit}
              className="flex flex-col space-y-4 w-full"
            >
              <div>
                <span className="text-sm text-center text-gray-600 block">
                  Preencha seus dados para acessar a plataforma
                </span>
              </div>
              <div>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  size="small"
                  value={props.values.email}
                  onChange={props.handleChange}
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  id="password"
                  name="password"
                  label="Senha"
                  type="password"
                  variant="outlined"
                  size="small"
                  value={props.values.password}
                  onChange={props.handleChange}
                  fullWidth
                />
              </div>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Entrar
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
