import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiAdapter } from '@/core/adapters/apiAdapter';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';

export default function VistaPrevia() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const response = await apiAdapter.get(`getblogID/${id}`);
      setBlog(response);
    } catch (error) {
      console.error('Error al obtener el blog:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center mt-4">Cargando blog...</p>;
  if (!blog) return <p className="text-center mt-4">No se encontró el blog.</p>;

  const getEstadoLabel = (estado) => {
    switch (estado) {
      case "1":
        return <Tag value="Publicado" severity="success" />;
      case "2":
        return <Tag value="Guardado" severity="warning" />;
      default:
        return <Tag value="Desconocido" severity="info" />;
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
        <img
          src={`${process.env.REACT_APP_API_BASE_URL}uploads/${blog.imagenprincipal}`}
          alt="Imagen principal"
          className="w-full border-round mb-3"
          onError={(e) => e.target.style.display = 'none'}
          style={{paddingLeft:'10rem',paddingRight:'10rem'}}
        />
        <div className="text-sm text-color-secondary mb-2" style={{paddingLeft:'10rem',paddingRight:'10rem'}}>
          <strong>Fecha:</strong> {blog.fecha} &nbsp;&nbsp;
          <strong>Estado:</strong> {getEstadoLabel(blog.estado)} &nbsp;&nbsp;
          <strong>Categoría:</strong> {blog.tipoBlog}
        </div>
        
        <h1 style={{paddingLeft:'18rem',paddingRight:'18rem'}} className="mb-3">{blog.titulo}</h1>
        <p style={{paddingLeft:'18rem',paddingRight:'18rem'}} className="text-justify">{blog.descripcion}</p>
      <Divider />
      {blog.secciones.map(seccion => (
        <div key={seccion.id} style={{paddingLeft:'18rem',paddingRight:'18rem'}}>
            <h3 className="mb-2">{seccion.titulo}</h3>
            <div
              className="text-justify"
              dangerouslySetInnerHTML={{ __html: seccion.descripcion }}
            />
            {seccion.imagenesSecciones && (
                <img
                src={`${process.env.REACT_APP_API_BASE_URL}uploads/${seccion.imagenesSecciones}`}
                alt={seccion.titulo}
                className="w-full border-round mb-2"
                style={{paddingLeft:'10rem',paddingRight:'10rem'}}
                onError={(e) => e.target.style.display = 'none'}
                />
            )} 
        </div>
      ))}
    </div>
  );
}
