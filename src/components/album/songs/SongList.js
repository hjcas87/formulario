import { useEffect, useMemo } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { albumsWithSongsInfo } from "../../../actions/post"
import { removeError, removeMsg } from "../../../actions/ui"
import { getLocalStorage } from "../../../helpers/getLocalStorage"
import { SongCard } from "./SongCard"

export const SongList = () => {
    
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { data } = useMemo(() => getLocalStorage(), []);
    
    const { albumsYCanciones = []} = data;

    useEffect(() => {
        window.scroll({ top: 0, left: 0 })
        document.querySelector('body').classList.remove('overflow');
        dispatch( removeError() );
        dispatch( removeMsg() );
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        dispatch( albumsWithSongsInfo( albumsYCanciones ) );
        animationScreenNavigate();
    }

    const animationScreenNavigate = () => {
        const screen = document.querySelector('#info-screen');
        screen.classList.remove('animate__fadeInRight');
        screen.classList.add('animate__fadeOutLeft', 'animate__faster');
        screen.addEventListener('animationend', () => {
            
            navigate( '/album/genders' );
        
        });
    };

    return (
        <div className="main-container">
            
            <div className="text-secondary text-center animate__animated animate__fadeIn" id="info-screen">
                <div  className="py-5 mt-5">
                        <h1 className="text-align-left mb-0">Álbum</h1>
                    {
                        albumsYCanciones.map( (cancion, i) => (
                        
                                <div key={ i } className="mt-5">
                                    {
                                        cancion.length <= 0
                                            ?
                                            <div>
                                                <h1 className="text-white mb-7">Aún no hay canciones agregadas en tú lanzamiento</h1>
                                                <Link to={ '/album/selection' } className="max-w-15">Ir a agregar canciones</Link>
                                            </div>
                                            :
                                            <>    
                                                <h2 className="text-white text-align-left">Canciones del disco { i + 1}</h2>
                                                <hr />
                                                <div className="d-flex flex-column mt-3">
                                                    {
                                                        cancion.map( (song, x ) => (
                                                            
                                                            <SongCard key={ cancion[x].id }
                                                                indice={x} 
                                                                { ...song }
                                                            />
                                                        ))
                                                    }
                                                </div>
                                            </>
                                    }
                                </div>
                        ))      
                    }
                    <>
                        <hr className="mt-3" />
                    {
                        albumsYCanciones.length > 0 &&
                        <button
                            className="btn mt-5"
                            onClick={ handleClick }
                        >
                            Continuar
                        </button>
                    }
                    </>

                </div>
            </div>
        </div>
    )
}
