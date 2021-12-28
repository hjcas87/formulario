import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createInputsSongs } from "../../actions/ui";
import { useDinamicForm } from "../../hooks/useDinamicForm"
import { useForm } from "../../hooks/useForm"
import { albumsWithSongs } from "../../helpers/albumsWithSongs";

import 'animate.css';

export const SelectNumberOfAlbums = () => {

    const navigate = useNavigate()
    const data = JSON.parse(localStorage.getItem('albumValues')) || [];
    const dataSong = JSON.parse(localStorage.getItem('songsValues')) || [];
    const dataAlbumSong = JSON.parse(localStorage.getItem('album&SongsValues')) || [];
    
    const dispatch = useDispatch();
    
    const { amountObj = dataAlbumSong || [] } = useSelector(state => state.ui);
    
    const [ formValues, handleInputChange ] = useForm({
        numero_volumenes: data.length || '',
    })
    
    const [ campos, , , changes, createArrays, createArraysOfSongs ] = useDinamicForm( dataSong )
    
    let { numero_volumenes: numVol } = formValues;

    const handleClick = ( e ) => {
        e.preventDefault()
        const arr = createArrays(numVol, 'disco');
        localStorage.setItem( 'albumValues', JSON.stringify(arr) );
    }

    const handleInputSongsPerAlbum = ( e ) => {
        e.preventDefault()
        localStorage.setItem( 'songsValues', JSON.stringify(campos) );
        const arr = createArraysOfSongs();
        dispatch( createInputsSongs( arr ) )
    }
    const handleInputSongs = ( e ) => {
        e.preventDefault();
        const canciones = [...document.querySelectorAll('.canciones')]
        const arr = albumsWithSongs( amountObj, canciones )
        localStorage.setItem( 'album&SongsValues', JSON.stringify(arr) );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputs = [...document.querySelectorAll('input')];
        
        if (inputs.every( ipt => ipt.value !== '')) {
            const canciones = [...document.querySelectorAll('.canciones')]
            canciones.forEach( ( s, i ) => s.value = canciones[i].value)
            // inputs.forEach( ipt => ipt.readOnly = true)
            // navigate('/album/songs');
        }else{
            console.log('rellena todos los campos')
        }
        
    }

    return (
        <>
            <div className="titulo__seccion margin">
                <h2>Número de discos</h2>
            </div>   
            <div className="parrafo">   
                <p>¿Cuántos discos/volúmenes tiene tu álbum? (Para la mayoría de los artistas, 
                    la respuesta será uno, pero si estás lanzando un álbum doble o una caja de colección, 
                    por favor dinos cuántos discos hay en la caja).
                </p>
            </div>
            <form
                onSubmit={ handleSubmit }
            >
                <div className="campo">
                    <label htmlFor="numero_discos" className="campo__label negrita-medium">
                        Número de Discos/Volúmenes
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        className="campo__field"
                        id="numero_discos"
                        value={ numVol }
                        name="numero_volumenes"
                        onChange={ handleInputChange }
                    />
                </div>

                <button
                    onClick={ handleClick }
                >
                    ok
                </button> 

                <div>
                    {
                        campos.map( (vol, i) => (                         
                            <div
                                key={ `album ${ i }` } 
                                className="animate__animated animate__fadeInUp"
                            >
                                <label htmlFor="numero_canciones" className="campo__label negrita-medium">
                                    Número de canciones para el disco { i + 1 }
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="50"
                                    className="campo__field"
                                    id="numero_canciones"
                                    name={ Object.keys( vol ) }
                                    value={ Object.values( vol ) }
                                    onChange={ (e) => changes(e, i) }
                                />
                            </div>
                        ))
                            
                    }
                    {
                        campos.length !== 0 &&
                            <button
                                onClick={ handleInputSongsPerAlbum }
                            >
                                ok
                            </button> 
                    }
                </div>

                {
                    amountObj.map(( f, i ) => (
                        <div 
                            key={ i }
                            className="animate__animated animate__fadeInUp"
                        >
                            <h6>Titulos de las canciones del disco {i + 1}</h6>
                            {
                                amountObj[i].map( (f, x) => (
                                    <div key={ f + x }
                                    >
                                        {x + 1}-<input
                                                    type="text"
                                                    className="canciones"
                                                    name={ Object.keys( f )[0] }
                                                    defaultValue={ Object.values( f )[0] }
                                                />
                                                {/* <p>Actualizar</p> */}
                                    </div>
                                ))
                            }
                        </div>  
                    ))
                }
                {
                    amountObj.length !== 0 &&
                        <button
                            onClick={ handleInputSongs }
                        >
                            ok
                        </button>
                }

                <hr />
                <button>
                    Guardar Y continuar
                </button>

            </form>
        </>
    )
}
