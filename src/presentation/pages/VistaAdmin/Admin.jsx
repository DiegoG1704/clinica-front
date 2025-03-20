import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { apiAdapter } from '@/core/adapters/apiAdapter';
import { Card } from 'primereact/card';

export default function Admin() {
  const [resultado, setResultado] = useState(null);
  const [datos, setDatos] = useState({ dni: '' });
  const [mensajeError, setMensajeError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const Submit = async () => {
    setMensajeError('');
    setResultado(null);

    try {
      const response = await apiAdapter.post('buscarPorDNI', datos);

      // Verificar si la API devolvió datos válidos
      if (response && response.datos) {
        setResultado(response);
      } else {
        setMensajeError('No se encontraron datos para el DNI ingresado.');
      }
    } catch (error) {
      console.error('Error al buscar el DNI:', error);
      setMensajeError('Hubo un error al buscar el DNI.');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4 text-center text-gray-700">
        🔍 Buscar Usuario por DNI
      </h1>

      <div className="flex flex-col mb-4">
        <label className="text-gray-600 font-medium">DNI</label>
        <div className="flex flex-wrap items-center gap-2">
          <InputText
            name="dni"
            value={datos.dni}
            onChange={handleChange}
            placeholder="Ingrese el DNI..."
            className="p-inputtext flex-1 min-w-[200px] sm:min-w-[250px] md:min-w-[300px]"
          />
          <Button 
            label="Comprobar" 
            onClick={Submit} 
            className="p-button-primary w-full sm:w-auto"
          />
        </div>
      </div>


      {mensajeError && <p className="text-red-500 text-sm">{mensajeError}</p>}

      {resultado && resultado.datos && (
        <Card className="mt-4 border border-gray-300 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            ✅ Datos del Usuario
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong className="block text-gray-600">Nombre:</strong>
              <InputText disabled value={resultado.datos.nombres || "N/A"} />
            </div>
            <div>
              <strong className="block text-gray-600">Apellido:</strong>
              <InputText disabled value={resultado.datos.apellidos || "N/A"} />
            </div>
            <div>
              <strong className="block text-gray-600">Estado:</strong>
              <InputText disabled value={resultado.datos.estado || "No disponible"} />
            </div>
            <div>
              <strong className="block text-gray-600">Lista:</strong>
              <InputText disabled value={resultado.encontradoEn || "No encontrado"} />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
