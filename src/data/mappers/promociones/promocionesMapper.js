import { Promociones } from "../../../domain/entities/Promociones";


export class PromocionesMapper {
    static toDomain(data) {
        // let logoUrl=`${process.env.REACT_APP_API_BASE_URL}uploads/${data?.IsoTipo}`
        return new Promociones(
            data?.id,
            data?.area,
            data?.descuento,
            data?.descripcion,
            data?.clinica_id,
            data?.imagen,
            data?.calificacion
        );
    }
    static toData(archivo) {
         let promoFormData=new FormData()
         promoFormData.append("file",archivo)
         return promoFormData
        
    }
    static toDomainArray(dataArray) {
      
        const list= dataArray.map(data => this.toDomain(data));
        console.log("dataaa",list)
        
        return dataArray.map(data => this.toDomain(data));
    }

   
}
