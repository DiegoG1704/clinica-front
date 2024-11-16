import React, { useEffect, useState } from 'react'
import './Loader.css';
import loader from "../../img/spiner-image.png"

const Loader = ({ isLoading, setPanel }) => {
    const [panelSeparated, setPanelSeparated] = useState(false);
    const [loaderHidden, setLoaderHidden] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            // Iniciar la animación de los paneles y ocultar el loader cuando loading sea false
            setTimeout(() => {
                setPanelSeparated(true); // Cambia el estado para separar los paneles
            }, 1000); // 2 segundos de espera para que la animación comience

            // Después de 3.5 segundos, ocultar el loader completamente
            setTimeout(() => {
                setLoaderHidden(true); // Oculta el loader
                setPanel(false)
            }, 2200); // Esperar hasta que los paneles se separen por completo

        }
    }, [isLoading]);

    return (
        <div className={`panel-container ${panelSeparated ? 'panel-separate' : ''}`}>
            <div className="panel panel-left"></div>
            <div className="panel panel-right"></div>

            {/* Contenido de carga con el SVG de electrocardiograma */}
            <div className={`content ${loaderHidden || !isLoading ? 'loader-hidden' : ''}`}>
                <div className="loadingio-spinner-double-ring-nq4q5u6dq7r">
                    <div className="ldio-x2uulkbinbj">
                        {/* Spinner giratorio */}
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>

                {/* SVG de electrocardiograma (parpadeando) */}
                <img src={loader}  className="loader-svg" alt="" />
                {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.0"
                    width="388.000000pt"
                    height="298.000000pt"
                    viewBox="0 0 388.000000 298.000000"
                    preserveAspectRatio="xMidYMid meet"
                   
                >
                    <g
                        transform="translate(0.000000,298.000000) scale(0.100000,-0.100000)"
                        fill="#ffffff"
                        stroke="#ffffff"
                    >
                        <path d="M1078 2603 c-9 -10 -69 -231 -134 -490 l-119 -473 -292 0 c-252 0 -294 -2 -307 -16 -21 -21 -20 -47 2 -67 16 -15 55 -17 335 -17 291 0 318 1 335 18 11 11 49 146 107 381 50 200 91 357 92 349 2 -7 50 -368 108 -803 58 -434 112 -839 120 -900 8 -60 18 -135 21 -165 7 -63 27 -100 52 -100 42 0 52 22 83 185 30 158 85 453 173 919 25 131 47 240 49 242 2 3 16 -44 31 -103 71 -290 197 -781 206 -800 11 -26 60 -32 79 -10 10 12 59 229 268 1189 32 147 59 265 60 264 2 -2 16 -88 32 -192 170 -1100 169 -1094 183 -1111 17 -21 56 -15 72 10 8 12 48 121 89 242 41 121 92 268 112 328 l37 107 253 0 c231 0 253 1 268 18 21 23 22 46 1 66 -13 14 -54 16 -293 16 -206 0 -281 -3 -294 -12 -9 -7 -53 -121 -98 -253 -78 -232 -98 -283 -99 -258 0 6 -23 157 -50 335 -28 178 -73 474 -101 658 -28 184 -58 345 -66 358 -15 25 -54 29 -73 7 -9 -11 -187 -800 -312 -1390 -12 -55 -24 -103 -28 -108 -3 -4 -20 48 -37 115 -141 566 -197 776 -209 796 -16 25 -55 29 -73 8 -14 -17 -25 -71 -198 -998 -26 -136 -48 -246 -50 -245 -2 3 -117 849 -163 1202 -5 39 -27 206 -50 373 -22 167 -40 305 -40 307 0 2 -7 11 -16 19 -20 21 -47 20 -66 -1z" />
                    </g>
                </svg> */}
            </div>
        </div >
    );
};

export default Loader
