// src/components/PDF/GenerarPDF.jsx

import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importamos el plugin para tablas

const GenerarPDF = ({ afiliados, gananciaTotal }) => {

  // Función recursiva para extraer los datos de los afiliados y sus hijos
  const getAfiliadosData = (afiliados) => {
    let data = [];
    afiliados.forEach(afiliado => {
      // Para cada afiliado, creamos una fila
      const fila = [
        afiliado.data.nombres,
        afiliado.data.apellidos,
        afiliado.data.dni,
        afiliado.data.telefono,
        afiliado.data.rol,
        afiliado.data.fecha_inscripcion,
        afiliado.data.ganancia
      ];
      data.push(fila);

      // Si el afiliado tiene hijos, los agregamos recursivamente
      if (afiliado.children && afiliado.children.length > 0) {
        data = data.concat(getAfiliadosData(afiliado.children)); // Llamada recursiva para los hijos
      }
    });
    return data;
  };

  const generarPDF = () => {
    const doc = new jsPDF();

    // Título del PDF
    doc.setFontSize(18);
    doc.text('Lista de Afiliados', 14, 20);

    // Datos de la tabla
    const tableData = getAfiliadosData(afiliados);

    // Columnas de la tabla
    const tableColumn = [
      "Nombres", "Apellidos", "DNI", "Teléfono", "Rol", 
      "Fecha Inscripción", "Ganancia"
    ];

    // Generar la tabla en el PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableData,
      startY: 30,
      theme: 'grid',
    });

    // Ganancia Total global
    doc.setFontSize(12);
    doc.text(`Ganancia Total: ${gananciaTotal}`, 14, doc.lastAutoTable.finalY + 10);

    // Guardar el PDF
    doc.save('afiliados.pdf');
  };

  return (
    <div className="flex justify-content-center" style={{ marginTop: '20px' }}>
      <button onClick={generarPDF} style={{ backgroundColor: "#FF5733", borderColor: "#FF5733", padding: '10px 20px', borderRadius: '5px', color: 'white' }}>
        Generar PDF
      </button>
    </div>
  );
};

export default GenerarPDF;
