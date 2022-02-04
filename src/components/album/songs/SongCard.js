import { Link } from "react-router-dom"



export const SongCard = ( { titulo, id, indice } ) => {

    console.log(id)

    return (
        <div className="d-flex song-card flex-fill g-1">
            <p className="text-white text-align-left text-transform m-0">{indice + 1}-{titulo}</p>
            
            <Link to={ `/album/songs/edit/${id}` } className="max-w-15 edit">Editar</Link>
        </div>
    )
}
