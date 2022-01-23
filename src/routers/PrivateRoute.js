import { Navigate } from "react-router-dom";
import { getLocalStorage } from "../helpers/getLocalStorage";



export const PrivateRoute = ({ children }) => {


    const { started } = getLocalStorage();

    return started
        ? children
        : <Navigate to='/' />

}