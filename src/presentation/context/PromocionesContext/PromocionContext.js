import { createContext, useContext } from "react";


const PromocionContext = createContext();

export const usePromocionContext = () => {
    const context = useContext(PromocionContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};

export const PromocionProvider = ({ children, value }) => {
    return <PromocionContext.Provider value={value}>
        {children}</PromocionContext.Provider>
};
