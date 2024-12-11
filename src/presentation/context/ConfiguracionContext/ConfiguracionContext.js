import { createContext, useContext } from "react";
import { dependenciesLocator } from "../../../common/dependencies/DependenciesLocator";

const ConfiguracionContext = createContext();

export const useConfiguracionPloc = () => {
    const context = useContext(ConfiguracionContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};

export const ConfiguracionProvider = ({ children, value }) => {
    const ConfiguracionPloc = dependenciesLocator.provideConfiguracionPloc();
    return <ConfiguracionContext.Provider value={ConfiguracionPloc}>
        {children}</ConfiguracionContext.Provider>
};





