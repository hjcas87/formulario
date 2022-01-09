import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../hooks/useForm"
import { useFormInside } from "../../hooks/useFormInside";
import { useDinamicForm } from "../../hooks/useDinamicForm"
import { createInputsSongs, removeError, setError } from "../../actions/ui";

import { albumsWithSongsAndId, albumsWithSongsUpdated } from "../../helpers/albumsWithSongsAndId";
import { infoFormAlbumWithSongs } from "../../actions/post";
import { FieldInput } from "../ui/FieldInput";
import { getLocalStorage } from "../../helpers/getLocalStorage";

let arr = []
export const SelectNumberOfAlbums = () => {
    
    const [boolean, setBoolean] = useState( false )

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { msgError } = useSelector( state => state.ui);

    const { dataAlbumsValues, dataSongValues, dataAlbumSongValues } = useMemo(() => getLocalStorage(boolean), [boolean]);

    const { amountObj = dataAlbumSongValues } = useSelector( state => state.ui );
    
    const [ formValues, handleInputChange ] = useForm({
        numero_volumenes: dataAlbumsValues.length || '',
    });
    const { numero_volumenes: numVol } = formValues;
    const [ campos, , , changes, createArrays, createArraysOfSongs ] = useDinamicForm( dataSongValues );
    const [ ,changess ] = useFormInside( amountObj );
    
    
    // localStorage.setItem( 'songsValues', JSON.stringify( campos ) );
    // localStorage.setItem( 'album&SongsValues', JSON.stringify( amountObj ) );

    useEffect(() => {
        const arr = createArraysOfSongs(amountObj);
        dispatch( createInputsSongs( arr ) );
        
    }, [dataAlbumsValues]);
    

    const handleClick = ( e ) => {
        e.preventDefault();
        if (isAlbumInputValid()) {
            const arr = createArrays(numVol, 'disco');
            localStorage.setItem( 'albumValues', JSON.stringify(arr) );
            setBoolean( !boolean );
        }
    }

    const handleSongAmount = (e) => {
        e.preventDefault();
        if (isSongAmountValid()) {
            const arr = createArraysOfSongs(amountObj);
            dispatch( createInputsSongs( arr ) );
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if ( isSongTitlesValid(e) ) {
            const canciones = albumsWithSongsAndId( amountObj );
            let data = JSON.parse(localStorage.getItem('albumFormValues')) || [[]];
            const newData = albumsWithSongsUpdated( canciones, data )
            localStorage.setItem( 'songsValues', JSON.stringify( campos ) );
            localStorage.setItem( 'albumFormValues', JSON.stringify(newData) );
            localStorage.setItem( 'albumAndSongsValues', JSON.stringify(newData) );
            dispatch( infoFormAlbumWithSongs( newData ) );
            
            animationScreenNavigate()
            
        }
        
    }

    const animationScreenNavigate = () => {
        const screen = document.querySelector('#album-info');
        screen.classList.remove('animate__fadeInRight');
        screen.classList.add('animate__fadeOutLeft', 'animate__faster');
        screen.addEventListener('animationend', () => {
            
            navigate('/album/songs');
        
        });
    };
    const isAlbumInputValid = () => {

        if ( numVol.toString().trim().length === 0 ) {
            dispatch( setError('Ingresa una cantidad válida del 1 al 10') );
            return false;
        } 
        if (Number(numVol) <= 0 || Number(numVol) > 10) {
            dispatch( setError('Ingresa una cantidad válida del 1 al 10') );
            return false;
        }
       
        dispatch( removeError() );
        return true;
    }
    const isSongAmountValid = () => {

        const inputSongs = document.querySelector('#input-songs')
        const inputs = [...inputSongs.querySelectorAll('input')];

        if ( inputs.some( ipt => ipt.value.toString().trim().length === 0 )) {
            window.scrollTo(0, 0)
            dispatch( setError('Ingresa una cantidad válida del 1 al 50') );
            return false;
        } 
        if (inputs.some( ipt => Number(ipt.value) <= 0 || Number(ipt.value) > 50 )) {
            window.scrollTo(0, 0)
            dispatch( setError('Ingresa una cantidad válida del 1 al 50') );
            return false;
        }
       
        dispatch( removeError() );
        return true;
    }

    const isSongTitlesValid = (e) => {

        const inputTitlesSongs = document.querySelector('#input-titles');
        const inputSongs = document.querySelector('#input-songs');
        const inputsValue = [...inputSongs.querySelectorAll('input')];
        
        const inputs = [...inputTitlesSongs.querySelectorAll('input')];
        const allInputs = [...document.querySelectorAll('input')];

        if (inputsValue.some( (ipt, i) => Number(ipt.value) !== amountObj[i].length )) {
            handleSongAmount(e);
            localStorage.setItem( 'songsValues', JSON.stringify( campos ) );
            return false;
        }
        if ( inputs.some( ipt => ipt.value.toString().trim().length === 0 )) {
            window.scrollTo(0, 0)
            dispatch( setError('Los titulos de las canciones no pueden estar vacios') );
            return false;
        }       
        if ( allInputs.some( ipt => ipt.value.toString().trim().length === 0 )) {
            window.scrollTo(0, 0)
            dispatch( setError('Por favor completá todos los campos') );
            return false;
        }       
        dispatch( removeError() );
        return true;
    }

    return (
        <div className="main-container">
        <div className=" text-secondary px-4 py-5 text-center flex-fill animate__animated animate__fadeIn" id="album-info">
                
            <div className="py-5">
                <h1 className="display-5 fw-bold text-white">Número de discos</h1>
                <div className="container-sm">
                    <p className="fw-ligth text-white mt-3 p-3">¿Cuántos discos/volúmenes tiene tu álbum? (Para la mayoría de los artistas, 
                        la respuesta será uno, pero si estás lanzando un álbum doble o una caja de colección, 
                        por favor dinos cuántos discos hay en la caja).
                    </p>
                </div>
                <div className="col-automx-auto">
                <form
                    onSubmit={ handleSubmit }
                >
                    { 
                        msgError &&
                            (
                                <div className="error">
                                    { msgError }
                                </div>
                            )
                    }
                    <div className="mb-3 d-flex flex-column flex-sm-column mt-5">
                        <div className="row g3 row-auto d-flex justify-content-center">
                            <label htmlFor="nombre" className="form-label fs-2 row-sm-1 col-auto">Número de Discos/Volúmenes</label>
                            <div className="col-auto align-self-center">
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    className="form-control fs-4"
                                    id="numero_discos"
                                    value={ numVol }
                                    name="numero_volumenes"
                                    onChange={ handleInputChange }
                                />
                            </div>
                            <button
                                className="btn btn-outline-light col-sm-1 col-auto fs-4"
                                onClick={ handleClick }
                            >
                                Ok
                            </button> 
                        </div>
                    </div>


                    <div id="input-songs">
                        {
                            // console.log(campos)
                            campos.map( (vol, i) => ( 
                                <div
                                key={ `album ${ i }` } 
                                className="mb-3 d-flex flex-column flex-sm-column mt-4 animate__animated animate__fadeInUp mt-5"
                                >                     
                                <div className="row g3 row-auto d-flex justify-content-center">
                                    <label htmlFor="numero_canciones" className="form-label fs-2 row-sm-1 col-auto mb-4 mt-4">
                                        Número de canciones para el disco { i + 1 }
                                    </label>
                                    <div className="col-auto align-self-center">
                                        <input
                                            type="number"
                                            min="1"
                                            max="50"
                                            className="form-control fs-4"
                                            name={`disco_${i + 1}`}
                                            value={ vol[`disco_${i + 1}`] || ''}
                                            onChange={ (e) => changes(e, i) }
                                        />
                                    </div> 
                                </div>
                            </div>
                            ))
                        }
                        {
                            campos.length !== 0 &&
                            <button
                                className="btn btn-outline-light col-sm-1 col-auto col-5 col-sm-4 fs-4 mt-5"
                                onClick={ handleSongAmount }
                            >
                                Ok
                            </button>
                        }
                    </div>
                    <div id="input-titles" className="mt-5">
                    {
                        amountObj.map(( f, i ) => (
                            <div 
                                key={ i }
                                className="animate__animated animate__fadeInUp"
                            >
                                <h2 className="display-6 fw-ligth text-white">Titulos de las canciones del disco {i + 1}</h2>
                                {
                                    
                                    amountObj[i].length === 0 ?
                                    // console.log(amountObj[i])

                                        <label htmlFor="numero_canciones" className="form-label fs-2 row-sm-1 col-auto">
                                            Aún no has agregado canciones para este volumén
                                        </label> 
                                    :
                                    amountObj[i].map( (j, x) => (

                                            <div key={ f + x }
                                                className="mb-3 d-flex flex-column flex-sm-column mt-4"
                                            >
                                                <div className="row g3 row-auto d-flex justify-content-center">
                                                    <label htmlFor="nombre" className="form-label fs-2 col-auto text-white">{ x + 1} -</label>
                                                    <div className="col-auto col-sm-7 align-self-center">
                                                        <input
                                                            type="text"
                                                            className="form-control fs-4 animate__animated animate__fadeInUp"
                                                            name={ Object.keys( j )[0] }
                                                            value={ Object.values( j )[0] }
                                                            onChange={ (e) => changess( amountObj, e, x, i) }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                    ))
                                }
                            </div>  
                        ))
                    }

                    </div>
                    <button className="btn btn-outline-info btn-lg px-4 fw-bold mt-5">
                        Guardar y continuar
                    </button>

                </form>
            </div>
        </div>
    </div>
        </div>
    )
}
