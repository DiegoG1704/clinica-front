import React, { useEffect, useState, useRef } from 'react';
import { Toast } from 'primereact/toast';

import { Card } from 'primereact/card';

import { InputText } from 'primereact/inputtext';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { apiAdapter } from '../../../core/adapters/apiAdapter';
import { useAuth } from '../../context/AuthContext/AuthContext';

import './css/SubAfiliados.css'
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import ProgressBar from '@/presentation/components/ProgressBar/ProgressBar';

export default function SubAfiliados({ UserId }) {
  const [afiliados, setAfiliados] = useState([]);

  const [filteredAfiliados, setFilteredAfiliados] = useState([]);

  const [gananciaTotal, setGananciaTotal] = useState(0);
  const toast = useRef(null);
  const { user } = useAuth();
  const [globalFilter, setGlobalFilter] = useState('');
  const [dataCards, setDataCards] = useState({
    totalAfiliados: 0,
    totalNivel1: 0,
    totalNivel2: 0,
    totalNivel3: 0,
    totalPromotor: 0,
    totalUsuario: 0,
    totalGanancia: 0,
    totalPorcentajePromotor: 0,
    totalPorcentajeUsuario: 0,
  })


  const calculateGananciaTotal = (data) => {
    let total = data.ganancia || 0;
    if (data.children && data.children.length > 0) {
      total += data.children.reduce((sum, child) => sum + calculateGananciaTotal(child), 0);
    }
    return total;
  };

  const formatAfiliados = (data) => {
    const gananciaTotal = calculateGananciaTotal(data);
    return {
      key: `key_${data.id}`,
      data: {
        nombres: data.nombres || '',
        apellidos: data.apellidos || '',
        dni: data.dni || '',
        telefono: data.telefono || '',
        rol: data.rol || '',
        fecha_inscripcion: data.fecha_inscripcion || '',
        nivel: data.nivel,
        ganancia: data.ganancia,
        ganancia_total: gananciaTotal,
      },
      children: data.children?.map(formatAfiliados) || [],
    };
  };

  const fetchAfiliados = async () => {
    try {
      const response = await apiAdapter.get(`${process.env.REACT_APP_API_BASE_URL}usuarios/${user?.id}`);
      const formattedData = response[0]?.children ? response[0].children.map(formatAfiliados) : response.map(formatAfiliados);
      setAfiliados(formattedData);
      setFilteredAfiliados(formattedData)
      mapperDataForCards(response[0])

      const totalGanancia = formattedData.reduce((sum, afiliado) => sum + afiliado.data.ganancia_total, 0);
      setGananciaTotal(totalGanancia);
    } catch (error) {
      console.error('Error al obtener los afiliados:', error);
    }
  };
  const mapperDataForCards = (data) => {
    let totalGanancia = data.ganancia_total.toFixed(2);
    let porcentajePromotor = ((data.total_promotor * 100) / data.total_afiliados).toFixed(2);
    let porcentajeUsuario = ((data.total_usuario * 100) / data.total_afiliados).toFixed(2);


    setDataCards({
      totalGanancia: totalGanancia,
      totalAfiliados: data.total_afiliados,
      totalNivel1: data.total_nivel_1,
      totalNivel2: data.total_nivel_2,
      totalNivel3: data.total_nivel_3,
      totalPromotor: data.total_promotor,
      totalUsuario: data.total_usuario,
      totalPorcentajePromotor: porcentajePromotor,
      totalPorcentajeUsuario: porcentajeUsuario,


    })

  }



  useEffect(() => {
    fetchAfiliados();
  }, [user?.id]);





  const getNivelEtiqueta = (nivel) => {
    switch (nivel) {
      case 'Nivel 1':
        return (<Tag style={{ background: '#dcfce7', fontSize: '14px', color: "#2b8e74", borderRadius: "15px" }}>nivel-1</Tag>);
      case 'Nivel 2':
        return (<Tag style={{ background: '#dbeafe', fontSize: '14px', color: "#5483e3", borderRadius: "15px" }}>nivel-2</Tag>);
      case 'Nivel 3':
        return (<Tag style={{ background: '#f3e8ff', fontSize: '14px', color: "#d47ed3", borderRadius: "15px" }}>nivel-3</Tag>);
      default:
        return '';
    }
  };
  const getRolEtiqueta = (nivel) => {

    switch (nivel) {
      case 'Promotor':
        return (<Tag style={{ background: '#dcfce7', fontSize: '14px', color: "#2b8e74", borderRadius: "15px" }}>Promotor</Tag>);
      case 'Usuario':
        return (<Tag style={{ background: '#dbeafe', fontSize: '14px', color: "#5483e3", borderRadius: "15px" }}>Usuario</Tag>);
      default:
        return '';
    }
  };
  const getNameTemplate = (name, role) => {

    return (
      <div className='inline-flex'>
        <div>
          <span>
            {role === 'Promotor' ? <i className='pi pi-user-plus' style={{ color: '#2aa879' }}></i> : <i className='pi pi-user' style={{ color: '#2aa879' }}></i>}
          </span>
        </div>
        <div>
          <span>{name}</span>
        </div>
      </div>
    )
  };

  const togglerTemplate = (node, options) => {
    if (!node) {
      return;
    }

    const expanded = options.expanded;
    const iconClassName = classNames('p-treetable-toggler-icon pi pi-fw', {
      'pi-caret-right': !expanded,
      'pi-caret-down': expanded
    });

    return (
      <button type="button" className="p-treetable-toggler p-link " style={options.buttonStyle} tabIndex={-1} onClick={options.onClick}>
        <span style={{ color: '#2aa87a' }} className={iconClassName} aria-hidden="true"></span>
      </button>
    );
  };
  const getHeader = () => {
    return (
      <div className="flex justify-content-end">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" />
        </IconField>
      </div>
    );
  };

  let header = getHeader();


  return (
    <div className='flex flex-column w-full'>
      <Toast ref={toast} />
      <div className="flex flex-column md:flex-row p-3 gap-3 container-data-afiliados">
        <div className="data-afiliados flex-1">
          <div className="data-afiliados__header">
            <h2 className="data-afiliados__header__title">Total Afiliados</h2>
            <p className="data-afiliados__header__subtitle">Todos los niveles</p>
          </div>
          <main className="data-afiliados__main">
            <p>{dataCards?.totalAfiliados}</p>
          </main>
          <footer className="flex justify-content-between flex-wrap">
            <div className="data-afiliados__quantity data-afiliados__quantity--first w-full sm:w-6 md:w-4 lg:w-4">
              <p>Nivel 1</p>
              <span>{dataCards?.totalNivel1}</span>
            </div>
            <div className="data-afiliados__quantity data-afiliados__quantity--second w-full sm:w-6 md:w-4 lg:w-4">
              <p>Nivel 2</p>
              <span>{dataCards?.totalNivel2}</span>
            </div>
            <div className="data-afiliados__quantity data-afiliados__quantity--third w-full sm:w-12 md:w-4 lg:w-4">
              <p>Nivel 3</p>
              <span>{dataCards?.totalNivel3}</span>
            </div>
          </footer>
        </div>

        <div className="data-afiliados data-afiliados--second flex-1">
          <div className="data-afiliados__header">
            <h2 className="data-afiliados__header__title">Por rol</h2>
            <p className="data-afiliados__header__subtitle">Distribución de roles</p>
          </div>
          <main className="data-afiliados__main--second">
            <div className="data-afiliados__main--second__item--first">
              <p>Promotor</p>
              <span>{dataCards?.totalPromotor}</span>
            </div>
            <div className="data-afiliados__main--second__item--secod">
              <p>Usuarios</p>
              <span>{dataCards?.totalUsuario}</span>
            </div>
          </main>
          <footer className="flex justify-content-between">
            <ProgressBar firstPercentage={dataCards?.totalPorcentajePromotor} secondPercentage={dataCards?.totalPorcentajeUsuario} />
          </footer>
        </div>

        <div className="data-afiliados data-afiliados--third flex-1">
          <div className="data-afiliados__header flex-column">
            <h2>Ganancia Total</h2>
            <p>Total de ganancia por afiliados</p>
          </div>
          <main>
            <p>S/ {dataCards?.totalGanancia}</p>
          </main>
        </div>
      </div>


      <div className="flex justify-content-center w-full ">
        <Card style={{ width: '100%', marginTop: '15px' }}>
          {/* <div className="flex justify-content-center mb-3 align-items-center">
            <div className="flex align-items-center justify-content-between  w-full" >

              <div className="flex align-items-center">
                <span className="mr-2">Ganancia Total:</span>
                <InputText value={gananciaTotal} disabled style={{ height: '4rem', width: '3rem' }} />
              </div>
            </div>
          </div> */}
          <TreeTable
            value={filteredAfiliados}
      
            dataKey="key"
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            togglerTemplate={togglerTemplate}
            globalFilter={globalFilter} header={header}
            responsiveLayout="stack"
            style={{ width:"100%" }}
          >
            <Column field="nombres" header="Nombres"
               expander style={{width:"200px"}} ></Column>
            <Column field="apellidos" header="Apellidos" style={{width:"200px"}} ></Column>
            <Column field="rol" header="Rol" body={(rowData) => getRolEtiqueta(rowData?.data?.rol)} style={{width:"200px"}} ></Column>
            <Column field="fecha_inscripcion" header="Fecha de Inscripción "style={{width:"200px"}} ></Column>
            <Column header='Nivel' body={(rowData) => getNivelEtiqueta(rowData.data.nivel)} style={{width:"150px"}} />
            <Column field="ganancia_total" header="Ganancia" style={{width:"100px"}}  ></Column>

          </TreeTable>
        </Card>
      </div>
      {/* <GenerarPDF afiliados={filteredAfiliados} gananciaTotal={gananciaTotal} /> */}
    </div>
  );
}
