import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"

import { infoFormAlbumWithSongs } from "../../actions/post"
import { albumWithSongs } from "../../helpers/albumsWithSongsAndId"
import { SongCard } from "./SongCard"

export const SongList = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { post = {}, postSongs } = useSelector(state => state.form);
    let data = JSON.parse(localStorage.getItem('albumFormValues')) || [[]];
    console.log( postSongs)
    console.log(data)
    let newDatos;
    if (!postSongs) {
        console.log('chi')
        newDatos = data;
    } else {
        console.log('chiqchi')
        newDatos = albumWithSongs( data , postSongs );
    }

    
    localStorage.setItem( 'albumFormValues', JSON.stringify(newDatos) );
    console.log(newDatos)

    
    // if ( !newDatos ) { return <Navigate to= '/' />}
    
    const handleClick = (e) => {
        e.preventDefault();
        dispatch( infoFormAlbumWithSongs( newDatos ) );
        navigate( '/genders' )
    }

    return (
        <>
            
            <div className="text-secondary px-4 py-5 text-center flex-fill animate__animated animate__fadeIn">
                <div  className="py-5">
                    {
                        newDatos.map( (cancion, i) => (
                        
                                <div key={ i }>
                                <h1 className="display-5 fw-bold text-white">Canciones del disco { i + 1}</h1>
                                    <div className="col-automx-auto">
                                        {
                                            cancion.map( (song, x ) => (
                                                
                                                <SongCard key={ cancion[x].id }
                                                    indice={x} 
                                                    { ...song }
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                        ))
                    }

                    <button
                        className="btn btn-outline-info btn-lg px-4 fw-bold mt-5"
                        onClick={ handleClick }
                    >
                        Continuar
                    </button>
                </div>
            </div>

            <div className="fill"></div>
        </>
    )
}
