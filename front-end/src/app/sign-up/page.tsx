"use client";

import { Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";

const initialValues = { name: "", email: "", password: "" };

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="grid justify-items-center w-72 p-6 border-2 border-gray-300 rounded-lg shadow-md">
        <span className="text-xl mb-4 text-center">Cadastro</span>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            try {
              const res = await fetch("http://localhost:3333/users", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...values,
                  role: "STUDENT",
                }),
              });

              if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || "Erro no cadastro");
              }

              alert("Usuário cadastrado com sucesso!");
              window.location.href = "/login";
            } catch (err: unknown) {
              alert("Erro ao cadastrar: " + err);
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
                  Preencha seus dados para cadastrar na plataforma
                </span>
              </div>
              <div>
                <TextField
                  id="name"
                  name="name"
                  label="Nome"
                  variant="outlined"
                  size="small"
                  value={props.values.name}
                  onChange={props.handleChange}
                  fullWidth
                />
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
                  Cadastrar
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
