import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";



export const PrivateRoute = ({ children }) => {

    const { post } = useSelector(state => state.form);
    // console.log(post)

    return post
        ? children
        : <Navigate to='/' />

}