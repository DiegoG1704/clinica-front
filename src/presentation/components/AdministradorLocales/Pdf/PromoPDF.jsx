import { jsPDF } from "jspdf";
import { Button } from "primereact/button";
import logo from "../../../img/logo-inicio.png"; // Ruta de la imagen

const PromoPDF = ({ promociones }) => {
  const generatePDF = () => {
    const doc = new jsPDF('landscape'); // Cambiar la orientación de la página a horizontal (landscape)
    doc.setFont("helvetica");

    // Título del PDF
    doc.setFontSize(18);
    doc.text("Lista de Promociones", 14, 20);

    // Agregar el logo en la esquina superior derecha y mantener su tamaño original
    // Tomamos la imagen original (no redimensionada)
    const logoWidth = 40; // Ancho de la imagen (ajústalo según lo que necesitas)
    const logoHeight = 20; // Alto de la imagen (ajústalo según lo que necesitas)
    doc.addImage(logo, 'PNG', 250, 6, logoWidth, logoHeight); // (url, tipo de imagen, x, y, ancho, alto)

    // Establecer la posición inicial de la tabla, moviéndola más abajo
    let yPosition = 50; // Ahora empieza a partir de la posición 50 para dar espacio al logo

    // Establecer los encabezados de la tabla
    doc.setFontSize(12);

    // Fondo verde para el encabezado de la tabla
    doc.setTextColor(255, 255, 255); // Color de texto blanco
    doc.setFillColor('#85C226'); // Color de fondo verde (RGB)
    doc.rect(14, yPosition - 8, 280, 10, 'F'); // Dibuja un rectángulo con color de fondo verde para todo el ancho

    // Escribir los encabezados
    doc.text("Nº", 14, yPosition);
    doc.text("Área", 50, yPosition);
    doc.text("Descuento", 110, yPosition);
    doc.text("Descripción", 150, yPosition);
    doc.text("Clínica", 220, yPosition);

    // Configurar color para las filas
    doc.setTextColor(0, 0, 0); // Color de texto negro
    doc.setFillColor(255, 255, 255); // Fondo blanco para las filas

    // Agregar las filas de datos
    promociones.forEach((promo, index) => {
      yPosition += 10;
      if (yPosition > 270) {
        doc.addPage(); // Si la página está llena, añadimos una nueva
        yPosition = 20; // Resetear la posición vertical
      }

      // Truncar la descripción a los primeros 10 caracteres
      const truncatedDescription = promo.descripcion.slice(0, 10);


      // Escribir los datos en las filas
      doc.text(`${index + 1}`, 14, yPosition + 7);
      doc.text(promo.area, 50, yPosition + 7);
      doc.text(promo.descuento, 110, yPosition + 7);
      doc.text(truncatedDescription, 150, yPosition + 7); // Mostrar la descripción truncada
      doc.text(promo.nombre_clinica, 200, yPosition + 7);
    });

    // Guardar el PDF generado
    doc.save("promociones.pdf");
  };

  return (
    <div>
      <Button
        icon="pi pi-file-pdf"
        severity="danger"
        outlined
        onClick={() => generatePDF()}  // Llamamos a la función para generar el PDF
      />
    </div>
  );
};

export default PromoPDF;
