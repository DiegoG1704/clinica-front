import { usePromocionPloc } from '../../../../context/PromocionesContext/PromocionContext';

import ClinicaItem from './ClinicaItem';

const PromocionesList = ({ data, fnEdit, FnDelete,fnCreate }) => {
    // const [searchTerm, setSearchTerm] = useState(''); // Estado para la búsqueda
    // const filteredData = data?.filter(local => {
    //     const lowercasedSearchTerm = searchTerm.toLowerCase();
    //     return (
    //         local.nombre.toLowerCase().includes(lowercasedSearchTerm) ||
    //         local.direccion.toLowerCase().includes(lowercasedSearchTerm)
    //     );
    // });

    const { clinica } = usePromocionPloc()
   
    const handleClickEdit = (dataLocal) => {
        console.log("rwu", dataLocal)
        fnEdit(dataLocal)
    }
    const handleClickDelete = (id) => {
        FnDelete(id)
    }
    console.log("dataasss",data)


   


    return (
        <div>
            <div className='flex justify-content-center'>
           
            </div>
            
            <div className="grid grid-nogutter gap-4 justify-content-center">
                {data?.map(item => (
                    <div className="col-12 sm:col-6 md:col-3" key={item.id}>
                        <ClinicaItem id={item.id} title={item.nombre} logo={item.logo} fnCreate={fnCreate} url={item?.tarifario?item?.tarifario:null}/>
                    </div>
                ))}
            </div>
        </div>
    )

   
}

export default PromocionesList
