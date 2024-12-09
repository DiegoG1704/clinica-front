import { createContext, useContext } from "react";
import { dependenciesLocator } from "../../../common/dependencies/DependenciesLocator";


const SubAdminContext = createContext();

export const useAdminPloc = () => {
    const context = useContext(SubAdminContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};

export const SubAdminProvider = ({ children, }) => {

    const subAdminPloc = dependenciesLocator.provideSubAdminPloc();
    return <SubAdminContext.Provider value={subAdminPloc}>
        {children}</SubAdminContext.Provider>
};
