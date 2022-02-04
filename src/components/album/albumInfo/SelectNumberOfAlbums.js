import React from 'react'
import { useDispatch, useSelector } from "react-redux"

import { removeError, setError } from "../../../actions/ui";
import { useForm } from '../../../hooks/useForm'
import { createArray } from '../../../helpers/createArrayOfAlbumsWithSongs';
import { infoFormAlbum } from '../../../actions/post';

export const SelectNumberOfAlbums = React.memo(({ albumValues }) => {

    const dispatch = useDispatch();

    const { albumInfo } = useSelector(state => state.albumForm);
    
    const [formValues, handleInputChanges] = useForm({
        numero_volumenes: albumValues.length !== 0 ? albumValues.length : ''
    })
    const { numero_volumenes } = formValues;

    const handleClick = ( e ) => {
        e.preventDefault();
        if (isFormValid()) {
            const arr = createArray( numero_volumenes, albumInfo.albumValues );
            albumInfo.albumValues = arr;
            albumInfo.albumStarted = true;
            dispatch( infoFormAlbum( albumInfo ) );
        }
    }

    const isFormValid = () => {
        if ( numero_volumenes.toString().trim().length === 0) {
            dispatch( setError('Decinos el número de discos que tiene tú lanzamiento') );
            return false;
        }
        if (numero_volumenes.toString().trim() > 10) {
            dispatch( setError('Introduce un número válido del uno al diez') );
            return false;
        }
        dispatch( removeError() );
        return true;
    }


    return (
        <div className="mb-3 d-flex" id="first-input">
            <div className="d-flex flex-column">
                <label htmlFor="nombre" className="mb-1">Número de Discos/Volúmenes</label>
                <div className="d-flex w-100 g-1 mb-1">
                    <input
                        type="number"
                        autoComplete="off"
                        min="1"
                        max="10"
                        className="form-control"
                        id="numero_discos"
                        value={ numero_volumenes }
                        name="numero_volumenes"
                        onChange={ handleInputChanges }
                    />
                <button
                    className="btn"
                    onClick={ handleClick }
                >
                    Ok
                </button> 
                </div>
            </div>
        </div>
    )
})
