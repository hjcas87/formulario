import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

import { infoFormAlbumWithSongs } from "../../actions/post"
import { albumsWithSongsAndId } from "../../helpers/albumsWithSongsAndId"
import { SongCard } from "./SongCard"


export const SongList = () => {

    const data = JSON.parse(localStorage.getItem('formValues')) || {}
    const { amountObj } = useSelector(state => state.ui)
    const canciones = albumsWithSongsAndId( amountObj );
    const dispatch = useDispatch();
    console.log(canciones)
    // console.log(data.canciones)
    
    useEffect(() => {
        
        dispatch( infoFormAlbumWithSongs( canciones ) );
        if(canciones) {
            data.canciones = [...canciones]
        }
        localStorage.setItem( 'formValues', JSON.stringify(data) );
        
    }, []);

    if ( !canciones ) { return <Navigate to= '/' />}

    return (
        <div>
            
            {
                canciones.map( (cancion, i) => (
                    <div key={ i }>
                    <h4>Canciones del disco { i + 1} </h4>

                        {
                            cancion.map( (song, x ) => (
                                
                                <SongCard key={ cancion[x].id } 
                                    { ...song }
                                />
                            ))
                        }
                    </div>
                ))
            }

        </div>
    )
}
