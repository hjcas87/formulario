import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { infoFormAlbumWithSongs } from "../../actions/post"
import { removeError } from "../../actions/ui"
import { albumWithSongs } from "../../helpers/albumsWithSongsAndId"
import { SongCard } from "./SongCard"

export const SongList = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { post = {}, postSongs } = useSelector(state => state.form);
    let data = JSON.parse(localStorage.getItem('albumFormValues')) || [[]];
    // console.log( postSongs)
    // console.log(data)
    let newDatos;
    if (!postSongs) {
        // console.log('chi')
        newDatos = data;
    } else {
        // console.log('chiqchi')
        newDatos = albumWithSongs( data , postSongs );
    }

    useEffect(() => {
        dispatch( removeError() )
    }, [])

    localStorage.setItem( 'albumFormValues', JSON.stringify(newDatos) );
    // console.log(newDatos)

    
    // if ( !newDatos ) { return <Navigate to= '/' />}
    
    const handleClick = (e) => {
        e.preventDefault();
        dispatch( infoFormAlbumWithSongs( newDatos ) );
        navigate( '/album/genders' )
    }

    return (
        <div className="main-container">
            
            <div className="text-secondary text-center animate__animated animate__fadeIn">
                <div  className="mt-7 p-2">
                    {
                        newDatos.map( (cancion, i) => (
                        
                                <div key={ i } className="mt-5">
                                <h1 className="text-white">Canciones del disco { i + 1}</h1>
                                    <div className="d-flex flex-column">
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
                        className="btn mt-5"
                        onClick={ handleClick }
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    )
}
