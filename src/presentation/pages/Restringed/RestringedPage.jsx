import React from 'react';
import character from "../../img/marciano_restringed.png";
import "./RestringedPage.css";
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
        

const RestringedPage = () => {
    return (
        <div className="restringed-page-container">
            <div className="container-message flex-column gap-4">
                <header>
                    <p className="message__title">Cuenta Inactiva</p>
                </header>
                <div>
                    <p className="message__description">Tu cuenta está pendiente de activación. Para más detalles, contáctanos.</p>
                    <div className="bank-info">
                        <Divider align="center" >
                            <div className="inline-flex align-items-center" >
                                <i className="pi pi-lightbulb mr-2"></i>
                                <p><strong>INDICACIONES</strong></p>
                            </div>
                        </Divider>
                        <p>Depositar la cantidad de  <strong>S/. 118</strong></p>
                        <p>Enviar el comprobante a este numero <strong>920517220</strong></p>
                        <p>La cuenta se activará hasta 24h después de la transferencia o 48h de la transferencia interbancaria </p>
                        <Divider align="center" >
                            <div className="inline-flex align-items-center" >
                                <p><strong>PAGOS</strong></p>
                            </div>
                        </Divider>
                        <p><strong>BCP: ADB CONSULTING SAC</strong></p>   
                        <p><i className="pi pi-credit-card" style={{ fontSize: '1rem' }}></i> Cuenta Corriente SOLES: <strong>194-2659964-0-21</strong></p>
                        <p><i className="pi pi-credit-card" style={{ fontSize: '1rem' }}></i> CCI Moneda Nacional: <strong>002-19400265996402191</strong></p>
                        {/* <p><i className="pi pi-mobile" style={{ fontSize: '1rem' }}></i> Yape: <strong>920517220</strong></p> */}
                    </div>
                </div>
                <div>
                    <Button label="Cerrar Sesión" className="message__btn" onClick={() => { /* Aquí agregar lógica para cerrar sesión */ }} />
                </div>
            </div>
        </div>
    );
}

export default RestringedPage;
