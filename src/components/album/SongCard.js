import { Link } from "react-router-dom"



export const SongCard = ( { nombre, id, indice } ) => {

    console.log(id)

    return (
        <div className="d-flex song-card flex-fill g-1 align-center">
            <p className="text-white text-transform m-0">{indice + 1}-{nombre}</p>
            
            <Link to={ `/album/edit/${id}` } className="max-w-15 edit">Editar</Link>
        </div>
    )
}
