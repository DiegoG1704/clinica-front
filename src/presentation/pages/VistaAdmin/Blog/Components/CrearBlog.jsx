import React, { useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { BookText, Plus, Trash2, Upload, X, Eye, Edit3, Dot, Circle, BookOpenCheck } from "lucide-react"
import { apiAdapter } from '@/core/adapters/apiAdapter'
import { useAuth } from '@/presentation/context/AuthContext/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Dropdown } from 'primereact/dropdown'
import { Editor } from "primereact/editor";

export default function CrearBlog() {
  const navigate = useNavigate();
  const {user}=useAuth()
  const [data, setData] = useState([]);
  const [datos, setDatos] = useState({
    subtitulo: '',
    descripcion: '',
    image: null,
    imageURL: null,
  });
  const [titulo, setTitulo] = useState('');
  
  const [descripcionPrincipal, setDescripcionPrincipal] = useState('');
  const [imagenPrincipal, setImagenPrincipal] = useState(null);
  const [imagenPrincipalURL, setImagenPrincipalURL] = useState(null);
  const [tiposBlog,setTiposBlog]=useState([])
  const [TBlog,setTBlog]=useState(null)
  const [tituloPresentacion, setTituloPresentacion] = useState('');
  const [descripcionPresentacion, setDescripcionPresentacion] = useState('');
  const [imagenPresentacion, setImagenPresentacion] = useState(null);
  const [imagenPresentacionURL, setImagenPresentacionURL] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const tipoBlog = async()=>{
    try {
      const response = await apiAdapter.get('tipoBlog')
      setTiposBlog(response)
    } catch (error) {
      console.log('error',error);
    }
  }
  useEffect(()=>{
    tipoBlog();
  },[])

  const handleGuardarBlog = async (estado) => {
    const formData = new FormData();
    formData.append('tituloArt', tituloPresentacion);
    formData.append('descripcionArt', descripcionPresentacion);
    formData.append('imagenArt', imagenPresentacion);
    // Campos básicos
    formData.append('estado', estado); // ← usar valor dinámico
    formData.append('IDUsuario', user?.id);  // Corrige de IDUsusuario → IDUsuario
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcionPrincipal);
    formData.append('IdTipo', TBlog.id);

    // Imagen principal
    if (imagenPrincipal) {
      formData.append('imagenPrincipal', imagenPrincipal);
    }

    // Construir secciones y añadir imágenes de sección
    const seccionesSinImagen = data.map((item) => {
      if (item.image) {
        formData.append('imagenesSecciones', item.image); // agrega archivo (pueden ser múltiples con el mismo key)
      }
      return {
        titulo: item.subtitulo,
        descripcion: item.descripcion,
      };
    });

    // Añadir secciones como JSON
    formData.append('secciones', JSON.stringify(seccionesSinImagen));
    try {
      const response = await apiAdapter.post('PostBlog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Blog creado:");
      // Podrías redirigir o mostrar notificación aquí
      navigate('/Blog'); // si deseas redireccionar
    } catch (error) {
      console.error("Error al guardar el blog:", error);
    }
  };


  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenPrincipal(file);
      setImagenPrincipalURL(URL.createObjectURL(file));
    }
  };
  
  const handleImagePresentacionChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenPresentacion(file);
      setImagenPresentacionURL(URL.createObjectURL(file));
    }
  };


  const handleSeconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDatos({ ...datos, image: file, imageURL: URL.createObjectURL(file) });
    }
  };

  const removeImage = () => {
    setDatos({ ...datos, image: null, imageURL: null });
  };

  const removeMainImage = () => {
    setImagenPrincipal(null);
    setImagenPrincipalURL(null);
  };

  const handleAgregar = () => {
    if (datos.subtitulo && datos.descripcion) {
      setData([...data, { ...datos }]); // esto incluye imageURL también
      setDatos({ subtitulo: '', descripcion: '', image: null, imageURL: null });
    }
  };

  const handleEliminar = (indexToDelete) => {
    const nuevaData = data.filter((_, index) => index !== indexToDelete);
    setData(nuevaData);
  };

  const ImageUpload = ({
  imageURL,
  onImageChange,
  onRemove,
  className = "w-[50px] h-auto", // ancho por defecto si no se sobreescribe
  inputId = "image-upload"
}) => (
  <div className="space-y-2">
    {!imageURL ? (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
        <label htmlFor={inputId} className="cursor-pointer text-sm text-gray-600 hover:text-gray-800 block">
          Haz clic para subir imagen
        </label>
        <input id={inputId} type="file" accept="image/*" onChange={onImageChange} className="hidden" />
      </div>
    ) : (
      <div className="relative inline-block w-full max-w-[500px]">
        <img
          src={imageURL || "/placeholder.svg"}
          alt="Preview"
          className={`${className} object-cover rounded-lg border px-6`}
        />
        <Button
          onClick={onRemove}
          icon="pi pi-trash"
          className="absolute top-2 right-2 bg-red-100 text-red-600 border-red-100 hover:bg-white p-1 rounded-full shadow"
          style={{ zIndex: 10 }}
        />
      </div>
    )}
  </div>
);

  return (
    <div className='p-4'>
      <div className="flex items-center gap-3 mb-4">
        <div className='flex'>
          <BookText className=" h-3rem w-3rem text-blue-600 p-2 bg-blue-100 border-round-xl" />
          <div>
            <strong className="text-3xl text-gray-900">Crear de Blog</strong>
            <p className="text-gray-600">Crea contenido de manera profesional</p>
          </div>
        </div>
      </div>
      <div className='flex gap-2'>
        <Button
          label="Publicar"
          icon="pi pi-globe"
          className="bg-blue-100 text-blue-600 border-blue-100"
          onClick={() => handleGuardarBlog(1)}
        />
        <Button
          label="Guardar Blog"
          icon="pi pi-save"
          className="bg-blue-100 text-blue-600 border-blue-100"
          onClick={() => handleGuardarBlog(2)}
        />
      </div>

      {/* Sección Contenido Articulo */}
      <div className='bg-white p-5 m-2 border-round-2xl shadow-2'>
        <div className='flex gap-2'>
          <Circle className="p-2 h-2rem w-2rem text-blue-600 bg-blue-100 border-round-xl" />
          <strong className="text-2xl font-bold text-gray-900">Contenido Presentacion</strong>
        </div>
        <p className="text-gray-600 mb-4">Define el título, descripción e imagen de la presentacion del blog</p>
        <div className='flex gap-5'>
          <div className='w-full'>
            <span className="text-sm font-medium mb-2 block">Titulo de la presentacion</span>
            <InputText className='mb-3 w-full' value={tituloPresentacion} onChange={(e) => setTituloPresentacion(e.target.value)} />
            
            <span className="text-sm font-medium mb-2 block">Descripción Presentacion</span>
            {/* <InputTextarea className='mb-3 w-full h-12rem' autoResize value={descripcionPresentacion} onChange={(e) => setDescripcionPresentacion(e.target.value)} /> */}
            <Editor
              value={descripcionPresentacion}
              onChange={(e) => setDescripcionPresentacion(e.htmlValue)}
              className="mb-3 w-full"
              style={{ height: '200px' }}
            />

          </div>
          <div className='w-full'>
            <strong className="text-sm font-medium mb-3 block">Imagen Presentacion</strong>
            <ImageUpload
              imageURL={imagenPresentacionURL}
              onImageChange={handleImagePresentacionChange} // ← ahora correcto
              onRemove={() => {
                setImagenPresentacion(null);
                setImagenPresentacionURL(null);
              }}
              className="w-full h-full"
              inputId="presentacion-image"
            />
          </div>
        </div>
      </div>
      

      {/* Sección Contenido Principal */}
      <div className='bg-white p-5 m-2 border-round-2xl shadow-2'>
        <div className='flex gap-2'>
          <Circle className="p-2 h-2rem w-2rem text-blue-600 bg-blue-100 border-round-xl" />
          <strong className="text-2xl font-bold text-gray-900">Contenido Principal</strong>
        </div>
        <p className="text-gray-600 mb-4">Define el título, descripción e imagen principal de tu blog</p>
        <div className='flex gap-5'>
          <div className='w-full'>
            <span className="text-sm font-medium mb-2 block">Titulo del blog</span>
            <InputText className='mb-3 w-full' value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            
            <span className="text-sm font-medium mb-2 block">Descripción Principal</span>
            {/* <InputTextarea className='mb-3 w-full h-12rem' autoResize value={descripcionPrincipal} onChange={(e) => setDescripcionPrincipal(e.target.value)} /> */}
            <Editor
              value={descripcionPrincipal}
              onChange={(e) => setDescripcionPrincipal(e.htmlValue)}
              className="mb-3 w-full"
              style={{ height: '200px' }}
            />
            
          </div>
          <div className='w-full'>
            <span className="text-sm font-medium mb-2 block">Tipo de Blog</span>
            <div className='flex gap-1'>
              <Dropdown className='w-full mb-3' options={tiposBlog} optionLabel='nombre' value={TBlog} onChange={(e)=>setTBlog(e.value)}/>
            </div>
           
            <strong className="text-sm font-medium mb-3 block">Imagen Principal</strong>
            <ImageUpload
              imageURL={imagenPrincipalURL}
              onImageChange={handleMainImageChange}
              onRemove={removeMainImage}
              className="w-full h-full"
              inputId="main-image"
            />
          </div>
        </div>
      </div>

      {/* Sección Contenido */}
      <div className='flex flex-wrap'>
        <div className='bg-white p-5 m-2 border-round-2xl shadow-2' style={{ flex: 1 }}>
          <div className='flex gap-2'>
            <Plus className=" h-2rem w-2rem text-green-600 p-1 bg-green-100 border-round-xl" />
            <strong className="text-2xl font-bold text-gray-900">Agregar Contenido</strong>
          </div>
          <p className="text-gray-600 mb-4">Añade secciones adicionales a tu blog</p>
          <strong className="text-sm font-medium mb-2 block">Subtitulo</strong>
          <InputText className='mb-3 w-full' name='subtitulo' onChange={handleChange} value={datos.subtitulo} />

          <strong className="text-sm font-medium mb-2 block">Descripcion</strong>
          {/* <InputTextarea className='mb-3 w-full h-12rem' autoResize name='descripcion' onChange={handleChange} value={datos.descripcion} /> */}
          <Editor
            value={datos.descripcion}
            onTextChange={(e) => setDatos({ ...datos, descripcion: e.htmlValue })}
            className="mb-3 w-full"
            style={{ height: '200px' }}
          />

          <div>
            <strong className="text-sm font-medium mb-2 block">Imagen Principal</strong>
            <ImageUpload
              imageURL={datos.imageURL}
              onImageChange={handleSeconChange}
              onRemove={removeImage}
              className="w-full h-48"
              inputId="section-image"
            />
          </div>
          <div className='mt-3 w-full'>
            <Button label='Agregar a contenido' onClick={handleAgregar} className='w-full surface-500 border-500'/>
          </div>
        </div>

        {/* Tabla de Contenido */}
        <div className='bg-white p-5 m-2 border-round-2xl shadow-2' style={{ flex: 1 }}>
          <div className="flex items-center justify-content-between">
            <div className='flex gap-2'>
              <BookOpenCheck className=" h-2rem w-2rem text-purple-600 p-1 bg-purple-100 border-round-xl" />
              <strong className="text-2xl font-bold text-gray-900">Contenido Agregado</strong>
            </div>
            <span>{data.length} secciones</span>
          </div>
          <p className="text-gray-600 mb-4">Gestiona las secciones de tu blog</p>

          <div className="overflow-y-auto" style={{ maxHeight: '550px' }}>
            {data.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <BookText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No hay contenido agregado aún</p>
                <p className="text-sm">Agrega tu primera sección</p>
              </div>
            ) : (
              data.map((item, index) => (
                <div key={index} className="border-b bg-white p-3 m-2 border-round-2xl shadow-2">
                  <div className="flex justify-content-between items-start mb-1">
                    <h3 className="text-md font-semibold text-gray-800">{item.subtitulo}</h3>
                    <Button
                      icon="pi pi-trash"
                      className="bg-white text-red-600 border-white"
                      onClick={() => handleEliminar(index)}
                    />
                  </div>
                  <p className="text-xs text-gray-600">
                    {item.descripcion.length > 80
                      ? `${item.descripcion.substring(0, 80)}...`
                      : item.descripcion}
                  </p>
                </div>
              ))
            )}
          </div>
          </div>
        </div>
    </div>
  );
}
