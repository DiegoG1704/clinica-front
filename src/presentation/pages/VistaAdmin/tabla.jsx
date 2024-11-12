import axios from 'axios';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { Divider } from 'primereact/divider';
import React, { useEffect, useState } from 'react';
import { apiAdapter } from '../../../core/adapters/apiAdapter';
import { useNavigate } from 'react-router-dom';

export default function Home() { 
  const [logistica, setLogistica] = useState(null);
  const Navigate = useNavigate()
    useEffect(() => {
      const fetchLogistica = async () => {
          try {
              const response = await apiAdapter.get('Logistica');
              setLogistica(response); // Asegúrate de que este acceso sea correcto
          } catch (error) {
              console.error('Error fetching clinic data:', error);
          }
      };

      fetchLogistica();
  }, []);

    // Asegúrate de que logistica no sea null antes de acceder a sus propiedades
    const afiliadosPorMes = logistica?.AfiliadosPorMes || [];
    const afiliadorPorMes = logistica?.AfiliadorPorMes || [];
  
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
  
    // Array de nombres de meses
    const mesesNombres = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
  
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
  
        // Extraer meses y datos para los datasets
        const labels = afiliadosPorMes.map(item => mesesNombres[item.mes]);
        const afiliadosData = afiliadosPorMes.map(item => item.total);
        const afiliadorData = afiliadorPorMes.map(item => item.total);
  
        const data = {
            labels,
            datasets: [
                {
                    label: 'Afiliados',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    yAxisID: 'y',
                    tension: 0.4,
                    data: afiliadosData
                },
                {
                    label: 'Afiliadores',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    yAxisID: 'y1',
                    tension: 0.4,
                    data: afiliadorData
                }
            ]
        };
  
        const options = {
            stacked: false,
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: surfaceBorder
                    }
                }
            }
        };
  
        setChartData(data);
        setChartOptions(options);
    }, [afiliadosPorMes, afiliadorPorMes]);

    const [chartDataDonus, setChartDataDonus] = useState({});
    const [chartOptionsDonus, setChartOptionsDonus] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'), 
                        documentStyle.getPropertyValue('--yellow-500'), 
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--yellow-400'), 
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        };
        const options = {
            cutout: '60%'
        };

        setChartDataDonus(data);
        setChartOptionsDonus(options);
    }, []);
 

  const getCurrentMonth = () => {
    const options = { month: 'long' };
    return new Intl.DateTimeFormat('es-ES', options).format(new Date());
};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
      <div style={{ display: 'flex',width:'80%' }}>
        {logistica && logistica.total.map((item, index) => ( // Asegúrate de que logistica.total existe
          <Card key={index} style={{ width: '400px', margin: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span>{item.title}</span>
                      <h1>{item.cantidad}</h1>
                  </div>
                  <div>
                      <Button icon={item.icono} disabled rounded severity={item.severity} aria-label="Favorite" 
                      style={{ marginRight: '8px', width: '60px', height: '60px',background:'#85C226',borderColor:'#85C226' }} />
                  </div>
              </div>
              <div>
                  <span className={'pi pi-arrow-up'} style={{ marginRight: '15px', color: 'green' }}>{item.cambio}</span>
                  <span>Mes: {getCurrentMonth()}</span> 
              </div>
          </Card>
        ))}
      </div>

      {/* Contenedor para los dos cards adicionales */}
      <div style={{ display: 'flex', marginTop: '20px',width:'80%' }}>
        <Card style={{ width: '65%', margin: '15px' }}>
          <Chart type="line" data={chartData} options={chartOptions} />
        </Card>
        <Card style={{ width: '30%', margin: '15px' }}>
          <Chart type="doughnut" data={chartDataDonus} options={chartOptionsDonus} className="w-full " />
        </Card>
      </div>
      <div style={{ display: 'flex', marginTop: '20px',width:'81%' }}>
        <Card style={{ width: '50%', margin: '15px' }}>
          <label style={{ fontWeight: 'bold',fontSize:'25px' }}>Lista de Mejores Promociones</label>
          <Divider/>
          {logistica && logistica.promocionesLista.map((item, index) => (
            <div key={index} className='flex flex-column h-6rem'>
              <div className='flex flex-block'>
                <div>
                  <img src={`${process.env.REACT_APP_API_BASE_URL}uploads/${item.imagen}`} alt="Tipo" width="60" className='border-round-sm' />
                </div>
                <div className='flex flex-column ml-3'>
                  <label style={{ fontWeight: 'bold',fontSize:'15px' }}>{item.area}</label>
                  <span>Calificacion: {item.calificacion} estrellas</span>
                </div>
              </div>
              <Divider/>
            </div>
          ))}
          <div className='flex justify-content-end'>
            <Button 
            style={{background:'white',borderColor:'white',color:'black'}}
            onClick={()=>Navigate('/PromocionesLocales')}
            > ver todas las promociones</Button>
          </div>
        </Card>
        <Card style={{ width: '50%', margin: '15px' }}>
          <label style={{ fontWeight: 'bold',fontSize:'25px' }}>Lista de Clinicas</label>
          <Divider/>
           {logistica && logistica.clinicasLista.map((item, index) => (
              <div key={index} className='flex flex-column h-6rem'>
                <div className='flex flex-block'>
                  <div>
                    <img src={`${process.env.REACT_APP_API_BASE_URL}uploads/${item.IsoTipo}`} alt="Tipo" width="60" className='border-round-sm' />
                  </div>
                  <div className='flex flex-column ml-3'>
                    <label style={{ fontWeight: 'bold',fontSize:'15px' }}>{item.nombre}</label>
                    <span>Ruc: {item.ruc}</span>
                  </div>
                </div>
                <Divider/>
              </div>
            ))}
            <div className='flex justify-content-end'>
            <Button 
            style={{background:'white',borderColor:'white',color:'black'}}
            onClick={()=>Navigate('/Clinicas')}
            > ver todas las clinicas</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
