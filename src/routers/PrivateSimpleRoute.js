import { Navigate } from "react-router-dom";
import { getLocalStorage } from "../helpers/getLocalStorage";



export const PrivateSimpleRoute = ({ children }) => {


    const { started, simpleData } = getLocalStorage();
    const { simpleStarted } = simpleData;

    return started  && simpleStarted
        ? children
        : <Navigate to='/' />

}