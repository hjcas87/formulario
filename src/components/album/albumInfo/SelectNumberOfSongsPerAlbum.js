import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { createInputsSongs, removeError, setError } from "../../../actions/ui";
import { InputNumberOfSongsPerAlbum } from "../../ui/InputNumberOfSongsPerAlbum"
import { createArraysOfSongs } from "../../../helpers/createArrayOfAlbumsWithSongs";
import { infoFormAlbum } from "../../../actions/post";


export const SelectNumberOfSongsPerAlbum = ({ albumValues, twoLocal }) => {

    const dispatch = useDispatch()
    
    const { albumInfo } = useSelector(state => state.albumForm)

    const { amountObj = twoLocal } = useSelector( state => state.ui );

    useEffect(() => {

        albumInfo.albumValues = albumValues;

    }, [albumValues]);

    useEffect(() => {

        const arr = createArraysOfSongs(albumInfo.albumValues, amountObj);
        dispatch( createInputsSongs( arr ) );
        
    }, [ albumInfo.albumValues ]);

    const handleSongAmount = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            const arr = createArraysOfSongs(albumInfo.albumValues, amountObj);
            dispatch( createInputsSongs( arr ) );
            dispatch( infoFormAlbum( albumInfo ) )
        }
    }

    const isFormValid = () => {
        if ( albumInfo.albumValues.some((album, i) => album[`disco_${i + 1}`].trim().length === 0)) {
            dispatch( setError('Completá todos los campos') );
            return false;
        }
        if (albumInfo.albumValues.some((album, i) => album[`disco_${i + 1}`].trim() > 50) ) {
            dispatch( setError('Introduce un número válido del uno al cincuenta') );
            return false;
        }
        dispatch( removeError() );
        return true;
    }

    return (
        <div className="d-flex flex-column" id="input-songs">
            {
                albumInfo.albumValues.map( (vol, i) => ( 
                    <div
                    key={ `album ${ i }` } 
                    className="mb-3 d-flex mt-5 animate__animated animate__fadeInUp"
                    >                     
                    <div className="d-flex flex-column">
                        <label htmlFor="numero_canciones" className="mb-3">
                            Número de canciones para el disco { i + 1 }
                        </label>
                        <div className="d-flex w-10 g-1 mb-1 min-h-4">
                            <InputNumberOfSongsPerAlbum
                                amount={albumInfo.albumValues}
                                volume={vol}
                                index={i}
                            />
                        </div> 
                    </div>
                </div>
                ))
            }
            {
                albumInfo.albumValues.length !== 0 &&
                <button
                    className="btn align-self-left"
                    onClick={ handleSongAmount }
                >
                    Ok
                </button>
            }            

        </div>
    )
}
