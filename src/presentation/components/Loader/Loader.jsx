import { useState, useEffect } from 'react';
import './Loader.css';
import loader from "../../img/spiner-image.png";

const Loader = ({ isLoading }) => {
    const [showLoader, setShowLoader] = useState(isLoading);

    useEffect(() => {
        if (isLoading) {
            setShowLoader(true); // Muestra inmediatamente cuando isLoading es true
        } else {
            const timeout = setTimeout(() => setShowLoader(false), 500); // Retraso antes de ocultar (500ms)
            return () => clearTimeout(timeout); // Limpia el timeout si isLoading cambia antes de completarse
        }
    }, [isLoading]);

    if (!showLoader) return null; // No renderiza si el loader ya se ocultó

    return (
        <div className="panel-container">
            <div className="loadingio-spinner-double-ring-nq4q5u6dq7r">
                <div className="ldio-x2uulkbinbj">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <img src={loader} className="loader-svg" alt="loader" />
        </div>
    );
};

export default Loader;
