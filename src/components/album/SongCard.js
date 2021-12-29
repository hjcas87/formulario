import { Link } from "react-router-dom"



export const SongCard = ( { nombre, id } ) => {

    // console.log(props)

    return (
        <div>
            <p>{nombre}</p>
            <div>
                <Link to={ `/edit/${id}` }>Editar</Link>
            </div>
        </div>
    )
}
