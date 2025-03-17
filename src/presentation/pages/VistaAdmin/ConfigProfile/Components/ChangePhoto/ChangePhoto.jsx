import CustomDialog from "@/presentation/components/Dialog/CustomDialog";
import { useRef, useState } from "react";
import photoDefault from "@/presentation/img/photo-default.png";
import "./styles/ChangePhoto.css";

const ChangePhoto = ({ fnUpdatePhoto, visible, setVisible, image, setImage }) => {
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [isHovering, setIsHovering] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImage(imageURL);
            setFile(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setFile(null);
        fileInputRef.current.value = ""; // Resetea el input para permitir nuevas selecciones
    };

    const handlechangePhoto =async () => {
        const response = await fnUpdatePhoto(file);
        console.log("sss",response)
        if(response?.success){
            onHideDialog()
        }
    };

    const onHideDialog = () => {
        setVisible(false);
        cleanPhoto();
    };

    const cleanPhoto = () => {
        setImage(null);
        setFile(null);
        fileInputRef.current.value = "";
    };

    const footerTemplate = (
        <div className="dialog-footer">
            <button
                className="cancel-button"
                onClick={handleRemoveImage}
                disabled={!image}
            >
                Cancelar
            </button>
            <button
                className="save-button"
                onClick={handlechangePhoto}
            >
                Guardar
            </button>
        </div>
    );
    const handleOverlayClick = () => {
        fileInputRef.current.click(); // Simula el click en el input de tipo file
    };

    return (
        <CustomDialog
            visible={visible}
            footer={footerTemplate}
            onhide={onHideDialog}
            title={"Actualizar foto de perfil"}
            iconClassName={"pi pi-camera"}
            className="photo-dialog"
        >
            <div className="change-photo-container">
                <div
                    className="image-wrapper"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <img
                        src={image || photoDefault}
                        alt="Profile Preview"
                        className="profile-image"
                    />

                    {/* Overlay on hover */}
                    <div className={`image-overlay ${isHovering ? 'visible' : ''} `} onClick={handleOverlayClick}>
                        <div className="overlay-content  ">
                            <label  ><i className="pi pi-camera overlay-icon "></i></label>

                            <p ><label htmlFor=""> Cambiar foto</label></p>
                        </div>
                    </div>

                    {/* Edit button */}

                </div>

                <div className="description-text">
                    <p>Selecciona una imagen que te represente. Se mostrará en tu perfil .</p>
                </div>

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="file-input"
                    id="file-upload"
                    onChange={handleImageChange}
                />
            </div>
        </CustomDialog>
    );
};

export default ChangePhoto;