import { useState } from "react"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { Badge } from "primereact/badge"
import { Message } from "primereact/message"

import { Search, User, AlertCircle, CheckCircle2, Loader2, FileText, Shield, MapPin } from "lucide-react"
import { apiAdapter } from "@/core/adapters/apiAdapter"

export default function Admin() {
  const [resultado, setResultado] = useState(null)
  const [dni, setDni] = useState("")
  const [mensajeError, setMensajeError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const validateDNI = (dni) => /^\d{8}$/.test(dni)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!dni.trim()) {
      setMensajeError("Por favor, ingrese un DNI")
      return
    }

    if (!validateDNI(dni)) {
      setMensajeError("El DNI debe tener exactamente 8 dígitos")
      return
    }

    setMensajeError("")
    setResultado(null)
    setIsLoading(true)

    try {
      const response = await apiAdapter.post("buscarPorDNI", { dni })

      if (response && response.datos) {
        setResultado(response)
      } else {
        setMensajeError("Afiliado no encontrado o no está activo")
      }
    } catch (error) {
      setMensajeError("Afiliado no encontrado o no está activo")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (estado) => {
    const status = estado?.toLowerCase()
    if (status === "activo") {
      return (
        <div className="flex align-items-center gap-2 text-green-600 font-medium">
          <CheckCircle2 size={16} />
          <span>Activo</span>
        </div>
      )
    } else if (status === "desactivado") {
      return (
        <div className="flex align-items-center gap-2 text-red-600 font-medium">
          <AlertCircle size={16} />
          <span>Inactivo</span>
        </div>
      )
    }

    return <span className="text-500">No disponible</span>
  }

  return (
    <div className="p-4 min-h-screen surface-100 flex justify-content-center">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex justify-content-center align-items-center gap-2 mb-2">
            <div className="p-2 surface-200 border-round">
              <Search className="text-primary" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-900">Búsqueda de Usuario</h1>
          </div>
          <p className="text-600">Ingrese el número de DNI para consultar la información del usuario en el sistema</p>
        </div>

        {/* Search Form */}
        <Card className="mb-4">
         
            <div className="field mb-3">
              <label htmlFor="dni" className="text-sm font-medium mb-1">DNI</label>
              <div className="flex gap-2">
                <InputText
                  id="dni"
                  value={dni}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 8)
                    setDni(value)
                    if (mensajeError) setMensajeError("")
                  }}
                  maxLength={8}
                  placeholder="Ej: 12345678"
                  disabled={isLoading}
                  className="w-full"
                />
                <Button
                  label={isLoading ? "Buscando..." : "Buscar"}
                  icon={isLoading ? <Loader2 className="animate-spin" /> : <Search />}
                  className="px-6 bg-primary hover:bg-primary-700"
                  disabled={isLoading || !dni.trim()}
                  onClick={handleSubmit}
                />
              </div>
            </div>

            {mensajeError && <Message severity="error" text={mensajeError} />}

        </Card>

        {/* Results */}
        {resultado && resultado.datos && (
          <Card>
            <div className="flex justify-content-between align-items-center mb-3">
              <div className="flex align-items-center gap-2">
                <User className="text-primary" size={20} />
                <h2 className="text-xl font-semibold text-900">Información del Usuario</h2>
              </div>
              <strong className="bg-blue-100 text-blue-700 p-2">Lista de {resultado.encontradoEn}</strong>
            </div>

            <p className="text-sm text-600 mb-3">
              Datos encontrados para el DNI: <strong>{dni}</strong>
            </p>

            <div className="grid grid-nogutter md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-md font-semibold mb-2 flex align-items-center gap-2 text-800">
                  <User size={16} className="text-primary" />
                  Datos Personales
                </h3>
                <div className="mb-2">
                  <small className="text-500">Nombres</small>
                  <p className="text-800 font-medium mt-1">{resultado.datos.nombres || "No disponible"}</p>
                </div>
                <div className="mb-2">
                  <small className="text-500">Apellidos</small>
                  <p className="text-800 font-medium mt-1">{resultado.datos.apellidos || "No disponible"}</p>
                </div>
                <div>
                  <small className="text-500">Estado</small>
                  <div className="mt-1">{getStatusBadge(resultado.datos.estado)}</div>
                </div>
              </div>

              <div>
                <h3 className="text-md font-semibold mb-2 flex align-items-center gap-2 text-800">
                  <MapPin size={16} className="text-primary" />
                  Información de Contacto
                </h3>
                {resultado.datos.telefono && (
                  <div className="mb-2">
                    <small className="text-500">Teléfono</small>
                    <p className="text-800 font-medium mt-1">{resultado.datos.telefono}</p>
                  </div>
                )}
                {resultado.datos.correo && (
                  <div className="mb-2">
                    <small className="text-500">Email</small>
                    <p className="text-800 font-medium mt-1">{resultado.datos.correo}</p>
                  </div>
                )}
                {resultado.datos.rol && (
                  <div>
                    <small className="text-500">Dirección</small>
                    <p className="text-800 font-medium mt-1">{resultado.datos.rol}</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}