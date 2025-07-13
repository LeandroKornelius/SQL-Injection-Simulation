"use client";

import { Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";

const initialValues = {
  card_number: "",
  card_owner: "",
  expiry_date: "",
  cvv: "",
};

export default function CardDetailsPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="grid justify-items-center w-80 p-6 border-2 border-gray-300 rounded-lg shadow-md">
        <span className="text-xl mb-4 text-center font-bold">Dados do Cartão</span>

        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            const userId = 1;

            const payload = {
              user_id: userId,
              card_number: values.card_number,
              card_owner: values.card_owner,
              expiry_date: values.expiry_date,
              cvv: values.cvv,
            };

            console.log("Payload enviado:", payload);

            alert(
              `Número: ${values.card_number}\nTitular: ${values.card_owner}\nValidade: ${values.expiry_date}\nCVV: ${values.cvv}`
            );

            router.push("/perfil");
          }}
        >
          {(props) => (
            <Form
              onSubmit={props.handleSubmit}
              className="flex flex-col space-y-4 w-full gap-2"
            >
              <TextField
                id="card_number"
                name="card_number"
                label="Número do Cartão"
                variant="outlined"
                size="small"
                value={props.values.card_number}
                onChange={props.handleChange}
                fullWidth
              />

              <TextField
                id="card_owner"
                name="card_owner"
                label="Nome do Titular"
                variant="outlined"
                size="small"
                value={props.values.card_owner}
                onChange={props.handleChange}
                fullWidth
              />

              <div className="grid grid-cols-2 gap-2">
                <TextField
                  id="expiry_date"
                  name="expiry_date"
                  label="Validade"
                  placeholder="MM/AA"
                  variant="outlined"
                  size="small"
                  value={props.values.expiry_date}
                  onChange={props.handleChange}
                  fullWidth
                />

                <TextField
                  id="cvv"
                  name="cvv"
                  label="CVV"
                  variant="outlined"
                  size="small"
                  value={props.values.cvv}
                  onChange={props.handleChange}
                  fullWidth
                />
              </div>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Salvar Dados
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
