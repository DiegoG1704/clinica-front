import { ClinicaLocal } from "../../../domain/entities/ClinicaLocal";




class ClinicaSubLocalMapper {
    static toDomain(data) {
       
        
        // let logoUrl=`${process.env.REACT_APP_API_BASE_URL}uploads/${data?.IsoTipo}`
        return new ClinicaLocal (
            data?.id,
            data?.nombre,
            data?.direccion,
            data?.clinica_id
            
        );
    }
    static toData(subLocal) {
        return {
            nombre: subLocal?.nombre, 
            direccion:subLocal?.direccion,
        };
    }
    static toDomainArray(dataArray) {
     
      
        // const list= dataArray.map(data => this.toDomain(data));
        // console.log("dataaa",list)
        
        return dataArray.map(data => this.toDomain(data));
    }

   
}

export default ClinicaSubLocalMapper;
