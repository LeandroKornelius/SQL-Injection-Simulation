"use client";

import { Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getToken } from "../utils/auth";
import { signPayload } from "../utils/crypto";

const initialValues = {
  card_number: "",
  card_owner: "",
  expiry_date: "",
  cvv: "",
};

export default function CardDetailsPage() {
  const router = useRouter();
  const [privateKeyPem, setPrivateKeyPem] = useState<string | null>(null);
  const [keyLoaded, setKeyLoaded] = useState(false);

  const handleKeyUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setPrivateKeyPem(e.target?.result as string);
      setKeyLoaded(true);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="grid justify-items-center w-100 p-6 border-2 border-gray-300 rounded-lg shadow-md">
        <span className="text-xl mb-4 text-center font-bold">
          Dados do Cartão
        </span>

        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            const token = getToken();
            if (!token || !privateKeyPem) {
              alert("Você precisa estar logado e carregar a chave privada.");
              return;
            }

            const payload = {
              cardNumber: values.card_number,
              cardOwner: values.card_owner,
              expiryDate: values.expiry_date,
              cvv: values.cvv,
            };

            try {
              const signature = await signPayload(payload, privateKeyPem);

              const res = await fetch("http://localhost:3333/payments", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ payload, signature }),
              });

              const result = await res.json();

              if (!res.ok)
                throw new Error(result.message || "Erro no pagamento");

              alert(`Pagamento criado com sucesso! ID: ${result.paymentId}`);
              router.push("/perfil");
            } catch (err) {
              console.error(err);
              alert("Erro ao enviar pagamento.");
            }
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

              <div className="mt-2">
                <label className="text-sm text-gray-600 mb-1 block">
                  Upload da Chave Privada (.pem):
                </label>
                <input type="file" accept=".pem" onChange={handleKeyUpload} />
                {keyLoaded && (
                  <div className="text-green-600 text-sm mt-1">
                    ✔️ Chave carregada com sucesso
                  </div>
                )}
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
