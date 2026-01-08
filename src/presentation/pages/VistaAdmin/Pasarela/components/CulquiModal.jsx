import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useEffect, useState } from "react";

export default function CulqiModal({ open, onClose }) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    if (!open) return;

    const script = document.createElement("script");
    script.src = "https://checkout.culqi.com/js/v4";
    script.async = true;

    script.onload = () => {
      // @ts-ignore
      window.Culqi.publicKey = "pk_test_icMwsrYEU3AFwtWY";

      // @ts-ignore
      window.Culqi.settings({
        title: "Mi Tienda",
        currency: "PEN",
        amount: 10000,
      });

      // @ts-ignore
      window.Culqi.options({
        lang: "es",
        modal: true,
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [open]);

  const openCheckout = () => {
    if (!acceptedTerms) return;
    // @ts-ignore
    window.Culqi.open();
  };

  useEffect(() => {
    // @ts-ignore
    window.culqi = async () => {
      // @ts-ignore
      if (window.Culqi.token) {
        // @ts-ignore
        const token = window.Culqi.token.id;

        console.log("Token generado:", token);

        // Cerrar Culqi
        // @ts-ignore
        window.Culqi.close();

        // Cerrar modal PrimeReact
        onClose();

        // Opcional
        window.location.reload();
      } else {
        // @ts-ignore
        console.error(window.Culqi.error);
      }
    };
  }, [onClose]);

  return (
    <Dialog
      header="Registrar Pago"
      visible={open}
      onHide={onClose}
      style={{ width: "50vw" }}
      modal
    >
      <iframe
        src="https://backmassalud.massalud.org.pe/FilePdf/PROMOTOR.pdf"
        style={{ width: "100%", height: "500px", border: "none" }}
        title="Tarifario PDF"
      />

      <div className="flex align-items-center gap-2 mt-3">
        <Checkbox
          inputId="terms"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.checked ?? false)}
        />
        <label htmlFor="terms">
          Acepto los{" "}
          <a
            href="https://tus-terminos.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            términos y condiciones
          </a>
        </label>
      </div>

      <Button
        label="Pagar S/ 100.00"
        className="w-full mt-3"
        disabled={!acceptedTerms}
        onClick={openCheckout}
      />
    </Dialog>
  );
}
