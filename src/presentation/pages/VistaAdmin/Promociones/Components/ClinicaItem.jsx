import { Button } from 'primereact/button';
import { Card } from 'primereact/card';


const ClinicaItem = ({ title, logo, id ,url,fnCreate}) => {
    const header = (
        <img alt="Card" src={logo} />
    );
    const footer = (
        <div className='flex justify-content-end p-2'>
            <Button label="Subir Promocciones" icon="pi pi-percentage" className='p-button-rounded bg-indigo-400 border-indigo-400' onClick={ ()=>{fnCreate(id,url);console.log("este_id",id)}}/>

        </div>
    );
    const titleTemplate = (
        <div style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%'
        }}>{title}</div>
    );

    return (
        <div className="card flex justify-content-center">
            <Card title={titleTemplate} footer={footer} header={header}
                className="p-shadow-2 p-2 " style={{ maxWidth: '400px', width: '100%', height: "320px", minWidth: "250px" }}
               
            />
        </div>
    );
}

export default ClinicaItem;
