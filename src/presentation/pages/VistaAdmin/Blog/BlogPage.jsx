import { apiAdapter } from '@/core/adapters/apiAdapter'
import CustomTable from '@/presentation/components/Table/CustomTable'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { Divider } from 'primereact/divider'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast'

export default function BlogPage() {
  const navigate = useNavigate();
  const[select,setSelect]=useState(null)
  
  const [listaBlogs,setListaBlog]=useState([])
  const fetchBlogs = async()=>{
    try {
      const response = await apiAdapter.get('getblog')
      setListaBlog(response)
    } catch (error) {
      console.log('error',error);
    }
  }
  useEffect(()=>{
    fetchBlogs();
  },[])

  const spanEstado = (rowData) => {
    let estadoTexto = '';
    let clase = '';

    switch (rowData.estado) {
      case "1":
        estadoTexto = 'Publicado';
        clase = 'bg-green-100 text-green-600 border-green-300';
        break;
      case "2":
        estadoTexto = 'Guardado';
        clase = 'bg-orange-100 text-orange-600 border-orange-300';
        break;
      default:
        estadoTexto = 'Desconocido';
        clase = 'bg-gray-100 text-gray-600 border-gray-300';
        break;
    }

    return (
      <span className={`p-2 border-round font-semibold ${clase}`}>
        {estadoTexto}
      </span>
    );
  };

  const eliminarBlog = async (id) => {
    try {
      await apiAdapter.delete(`deleteBlog/${id}`);
      toast.current.show({
        severity: 'success',
        summary: 'Blog eliminado',
        detail: `El blog con ID ${id} ha sido eliminado correctamente.`,
        life: 3000
      });
      fetchBlogs(); // Recargar la lista
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Hubo un problema al eliminar el blog.',
        life: 3000
      });
      console.error('Error al eliminar:', error);
    }
  };

  const confirmEliminarBlog = (rowData) => {
    confirmDialog({
      message: `¿Estás seguro de que deseas eliminar el blog: "${rowData.titulo}"?`,
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      accept: () => eliminarBlog(rowData.ID),
      reject: () => {
        toast.current.show({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Eliminación cancelada.',
          life: 2000
        });
      }
    });
  };

  const toast = useRef(null);

  const spanCategoria =(rowData)=>{
    return(
      <strong className='bg-blue-100 p-2 border-round text-blue-500'>{rowData.tipoBlog}</strong>
    )
  }

  const ButonAcciones =(rowData)=>{
    return(
      <div>
        <Button 
          icon="pi pi-trash" 
          className='bg-red-100 text-red-600 border-red-100' 
          tooltip='Eliminar' 
          tooltipOptions={{ position: 'top' }} 
          onClick={() => confirmEliminarBlog(rowData)}
        />
        {/* <Button 
          icon="pi pi-pencil" 
          className='bg-yellow-100 text-yellow-600 border-yellow-100' 
          tooltip='Editar' 
          tooltipOptions={{ position: 'top' }} 
          onClick={()=>setSelect(rowData)}
        /> */}
        <Button 
          icon="pi pi-eye" 
          className='bg-blue-100 text-blue-600 border-blue-100' 
          tooltip='Vista Previa' 
          tooltipOptions={{ position: 'top' }} 
          onClick={() => navigate(`/VistaPrevia/${rowData.ID}`)}
        />
      </div>
    )
  }
  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog />
      <header className={`flex header-module`}>
          <div className="flex-1 py-2 gap-0">
            <h1 className={"title-module "}>Lista de Blog</h1>
            <p className={"description-module "}>En este modulo se gestiona los blog publicados</p>
            <Divider />
          </div>
          <div className="flex justify-content-end align-items-center">
            <Button
              label="Añadir Blog"
              icon="pi pi-plus"
              className='bg-green-600 border-green-600 border-round-2xl'
              onClick={()=>navigate('/CrearBlog')}
            />
          </div>
        </header>
        <main>
          {select &&
            <p className='bg-red-100 border-red-100 p-2 text-red-500'>blog eliminado con id: {select.id}</p>
          }
          <div className='flex justify-content-center w-full'>
            <Card style={{ width: '100%', marginTop: '15px' }}>
              <CustomTable data={listaBlogs}>
                <Column header="Nº" body={(rowData, { rowIndex }) => rowIndex + 1} />
                <Column 
                  header="Titulo" 
                  body={(rowData) => rowData.titulo.length > 20 
                    ? rowData.titulo.substring(0, 20) + '...' 
                    : rowData.titulo} 
                />
                <Column header="Fecha de Publicacion" field='fecha' />
                <Column header="Estado" body={(rowData)=>spanEstado(rowData)} />
                <Column header="Categoria" body={(rowData)=>spanCategoria(rowData)} />
                <Column header="Acciones" body={(rowData)=>ButonAcciones(rowData)} />
              </CustomTable>
            </Card>
          </div>
        </main>
    </div>
  )
}
