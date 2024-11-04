import { createContext, useContext } from "react";
import { dependenciesLocator } from "../../../common/dependencies/DependenciesLocator";


const SubLocalContext = createContext();

export const useSubLocalPloc = () => {
    const context = useContext(SubLocalContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};

export const SubLocalProvider = ({ children, }) => {

    const cartPloc = dependenciesLocator.provideLocalesPloc();
    return <SubLocalContext.Provider value={cartPloc}>
        {children}</SubLocalContext.Provider>
};
