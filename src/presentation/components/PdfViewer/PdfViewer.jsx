import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useEffect, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Configurar el worker de pdf.js correctamente
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = ({ fileUrl }) => {
    const [pdfBlob, setPdfBlob] = useState(null);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();


    useEffect(() => {
        setPdfBlob(fileUrl);
    }, [fileUrl]);

    if (!pdfBlob) return <p>Cargando PDF...</p>;

    return (
        <div style={{
            border: '1px solid rgba(0, 0, 0, 0.3)',
            height: '100%',
       
        }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
            </Worker>
            {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"> <Viewer fileUrl={pdfBlob}  /></Worker> */}
        </div>
    );
};

export default PdfViewer;
