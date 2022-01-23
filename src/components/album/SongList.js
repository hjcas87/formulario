import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { albumsWithSongsInfo } from "../../actions/post"
import { removeError } from "../../actions/ui"
import { albumWithSongs } from "../../helpers/albumsWithSongsAndId"
import { getLocalStorage } from "../../helpers/getLocalStorage"
import { SongCard } from "./SongCard"

export const SongList = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { albumInfo } = useSelector(state => state.form);
    // let data = JSON.parse(localStorage.getItem('albumFormValues')) || [[]];
    const { data = {} } = useMemo(() => getLocalStorage(), []);
    console.log(data.albumsYCanciones)
    const { albumsYCanciones = []} = data;
    const { albumsYCanciones: albumsAndSongs } = albumInfo;
    // // console.log( albumsAndSongsValues)
    // // console.log(data)
    // let newDatos;
    // if (albumsAndSongs.length === 0) {
    //     console.log('chi')
    //     newDatos = albumsYCanciones;
    // } else {
    //     console.log('chiqchi')
    //     newDatos = albumWithSongs( albumsYCanciones , albumsAndSongs );
    // }

    useEffect(() => {
        dispatch( removeError() )
    }, [])

    // localStorage.setItem( 'albumFormValues', JSON.stringify(newDatos) );
    // console.log(newDatos)

    
    // if ( !newDatos ) { return <Navigate to= '/' />}
    
    const handleClick = (e) => {
        e.preventDefault();
        dispatch( albumsWithSongsInfo( albumsYCanciones ) );
        navigate( '/album/genders' )
    }

    return (
        <div className="main-container">
            
            <div className="text-secondary text-center animate__animated animate__fadeIn">
                <div  className="mt-7 p-2">
                    {
                        albumsYCanciones.length === 0 
                            
                            ?
                                <div>
                                    <h1 className="text-white mb-7">Aún no hay canciones agregadas en tú lanzamiento</h1>
                                    <Link to={ '/album/selection' } className="max-w-15">Ir a agregar canciones</Link>
                                </div>

                            :
                                
                                albumsYCanciones.map( (cancion, i) => (
                                
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
                    {
                        albumsYCanciones.length > 0 &&
                        <button
                            className="btn mt-5"
                            onClick={ handleClick }
                        >
                            Continuar
                        </button>
                    }

                </div>
            </div>
        </div>
    )
}
