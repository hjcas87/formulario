import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../hooks/useForm"
import { useFormInside } from "../../hooks/useFormInside";
import { useDinamicForm } from "../../hooks/useDinamicForm"
import { createInputsSongs } from "../../actions/ui";

import 'animate.css';

export const SelectNumberOfAlbums = () => {

    const navigate = useNavigate()
    const data = JSON.parse(localStorage.getItem('albumValues')) || [];
    const dataSong = JSON.parse(localStorage.getItem('songsValues')) || [];
    const dataAlbumSong = JSON.parse(localStorage.getItem('album&SongsValues')) || [];
    
    const dispatch = useDispatch();

    // console.log(dataAlbumSong)
    const [ campos, , , changes, createArrays, createArraysOfSongs ] = useDinamicForm( dataSong )
    const { amountObj = dataAlbumSong || [] } = useSelector(state => state.ui);
    localStorage.setItem( 'songsValues', JSON.stringify(campos) );
    localStorage.setItem( 'album&SongsValues', JSON.stringify(amountObj) );
    const [ ,changess ] = useFormInside(amountObj || [])
    // console.log(fields)
    console.log(amountObj)
    useEffect(() => {
        
        const arr = createArraysOfSongs(amountObj);
        dispatch( createInputsSongs( arr ) )
        
    }, [campos])

    const [ formValues, handleInputChange ] = useForm({
        numero_volumenes: data.length || '',
    })
    
    console.log(campos)
    let { numero_volumenes: numVol } = formValues;

    const handleClick = ( e ) => {
        e.preventDefault()
        const arr = createArrays(numVol, 'disco');
        localStorage.setItem( 'albumValues', JSON.stringify(arr) );
    }

    // const handleInputSongsPerAlbum = ( e ) => {
    //     e.preventDefault()
    //     const arr = createArraysOfSongs(amountObj);
    //     dispatch( createInputsSongs( arr ) )
    // }
    // const handleInputSongs = ( e ) => {
    //     e.preventDefault();
    //     // const canciones = [...document.querySelectorAll('.canciones')]
    //     // const arr = albumsWithSongs( fields, canciones )
    //     // console.log(fields)
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        // const inputs = [...document.querySelectorAll('input')];
        
        // if (inputs.every( ipt => ipt.value !== '')) {
        //     const canciones = [...document.querySelectorAll('.canciones')]
        //     canciones.forEach( ( s, i ) => s.value = canciones[i].value)
        //     // inputs.forEach( ipt => ipt.readOnly = true)
        navigate('/album/songs');
        // }else{
        //     console.log('rellena todos los campos')
        // }
        
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
                    {/* {
                        campos.length !== 0 &&
                            <button
                                onClick={ handleInputSongsPerAlbum }
                            >
                                ok
                            </button> 
                    } */}
                </div>

                {
                    amountObj.map(( f, i ) => (
                        <div 
                            key={ i }
                            className="animate__animated animate__fadeInUp"
                        >
                            <h6>Titulos de las canciones del disco {i + 1}</h6>
                            {
                                amountObj[i].map( (j, x) => (
                                    <div key={ f + x }
                                    >
                                        {x + 1}-
                                        <input
                                            type="text"
                                            className="canciones animate__animated animate__fadeInUp"
                                            name={ Object.keys( j )[0] }
                                            value={ Object.values( j )[0] }
                                            onChange={ (e) => changess( amountObj, e, x, i) }
                                        />
                                        {/* <p>Actualizar</p> */}
                                    </div>
                                ))
                            }
                        </div>  
                    ))
                }
                {/* {
                    // amountObj.length !== 0 &&
                        <button
                            onClick={ handleInputSongs }
                        >
                            ok
                        </button>
                } */}

                <hr />
                <button>
                    Guardar Y continuar
                </button>

            </form>
        </>
    )
}
