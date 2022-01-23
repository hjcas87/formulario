import { Navigate } from "react-router-dom";
import { getLocalStorage } from "../helpers/getLocalStorage";



export const PrivateAlbumRoute = ({ children }) => {


    const { started, data } = getLocalStorage();
    const { albumStarted } = data;

    return started  && albumStarted
        ? children
        : <Navigate to='/' />

}