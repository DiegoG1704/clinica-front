import { createContext, useContext } from "react";
import { dependenciesLocator } from "../../../common/dependencies/DependenciesLocator";

const PromocionContext = createContext();

export const usePromocionPloc = () => {
    const context = useContext(PromocionContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};

export const PromocionProvider = ({ children, value }) => {
    const promoPloc = dependenciesLocator.providePromocionesPloc();
    return <PromocionContext.Provider value={promoPloc}>
        {children}</PromocionContext.Provider>
};





