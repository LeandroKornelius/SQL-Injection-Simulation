"use client";

import { Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";

const initialValues = { email: "", password: "" };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="grid justify-items-center w-72 p-6 border-2 border-gray-300 rounded-lg shadow-md">
        <span className="text-xl mb-4 text-center">Login</span>
        <Formik
          initialValues={initialValues}
          // To Do
          onSubmit={async (values) => {
            alert(`Email: ${values.email}\nSenha: ${values.password}`);
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
