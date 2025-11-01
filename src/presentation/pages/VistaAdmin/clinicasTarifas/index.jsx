import { apiAdapter } from '@/core/adapters/apiAdapter';
import { useAuth } from '@/presentation/context/AuthContext/AuthContext';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react'

export default function ClinicasTar() {
  const {user}=useAuth();
  console.log(user);
  const [tarifario, setTarifario] = useState([]);
  useEffect(() => {
      const fetchIsoTipo = async () => {
          try {
              const response = await apiAdapter.get(`getPromociones/${user.clinica_id}`);
              setTarifario(response);
          } catch (error) {
              console.error('Error al obtener las clínicas:', error);
          }
      };

      fetchIsoTipo();
  }, []);
  const [precios, setPrecios] = useState([
    {
      id: 1,
      nombre: 'Promoción 1',
      precioActual: null,
      precioPromo: 200
    },
    {
      id: 2,
      nombre: 'Promoción 2',
      precioActual: null,
      precioPromo: 120
    }
  ]);

  // Función para actualizar el precio actual
  const handlePrecioChange = (id, value) => {
    setPrecios(prevPrecios =>
      prevPrecios.map(p =>
        p.id === id ? { ...p, precioActual: value } : p
      )
    );
  };

  const handleGuardar = (p) => {
    console.log("Nombre:", p.nombre);
    console.log("ID:", p.id);
    console.log("Precio actual:", p.precioActual);
    console.log("Precio promo:", p.descuento);
  };

  return (
    <div className="p-4">
      <div className="flex-1 py-2 gap-0">
        <h1 className={"title-module "}>Lista de tarifas</h1>
        <p className={"description-module "}>Completar los campos vacios de la lista de tarifas de la clinica</p>
        {/* <Divider /> */}
      </div>
      <div className="space-y-6">
        {tarifario.map(p => {
          return (
            <div
              key={p.id}
              className="flex gap-4 p-4 border rounded-lg shadow-sm"
            >
              <div className="flex flex-column gap-2">
                <p className="text-gray-500">Nombre</p>
                <span className="text-xl font-semibold">{p.nombre}</span>
              </div>
              <div className="flex flex-column gap-2">
                <p className="text-gray-500">Precio actual</p>
                <InputText
                  type="number"
                  value={p.precioActual || ''}
                  onChange={(e) => handlePrecioChange(p.id, e.target.value)}
                  placeholder="Ingresar precio actual"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-column gap-2">
                <p className="text-gray-500">Area</p>
                <span className="text-xl">{p.area}</span>
              </div>
              <div className="flex flex-column gap-2">
                <p className="text-gray-500">Precio Massalud</p>
                <span className="text-xl font-semibold">S/. {p.descuento}</span>
              </div>

              {/* Botón para guardar */}
              <div className="mt-4">
                <Button 
                  label="Guardar" 
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 p-2 rounded-md"
                  onClick={() => handleGuardar(p)} 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}
