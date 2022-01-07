import { Link } from "react-router-dom"



export const SongCard = ( { nombre, id, indice } ) => {

    // console.log(props)

    return (
        <>
            <p className="fw-ligth text-white mt-3 p-3">{indice + 1}-{nombre}</p>
            <div className="btn">
                <Link to={ `/edit/${id}` } className="text-white fs-4">Editar</Link>
            </div>
        </>
    )
}
