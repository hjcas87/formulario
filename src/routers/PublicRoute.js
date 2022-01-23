import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { getLocalStorage } from "../helpers/getLocalStorage";



export const PublicRoute = ({ children }) => {

    const { started } = getLocalStorage();

    return !started
        ? children
        : <Navigate to='resume' />

}