import React, { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { createInputsSongs, removeError, setError } from "../../../actions/ui";
import { InputNumberOfSongsPerAlbum } from "../../ui/InputNumberOfSongsPerAlbum"
import { createArraysOfSongs } from "../../../helpers/createArrayOfAlbumsWithSongs";
import { infoFormAlbum } from "../../../actions/post";


export const SelectNumberOfSongsPerAlbum = React.memo(({ oneLocal, twoLocal }) => {

    const dispatch = useDispatch()
    const { albumValues = oneLocal, albumInfo} = useSelector(state => state.form)

    const { amountObj = twoLocal } = useSelector( state => state.ui );

    // console.log(albumValues)
    // console.log(amountObj)
    useEffect(() => {
        
        const arr = createArraysOfSongs(albumValues, amountObj);
        dispatch( createInputsSongs( arr ) );
        // const arr = createArrayOfAlbumsWithSongs(albumValues);
        // albumInfo.albumsYCanciones = arr;
        // console.log(albumInfo.albumsYCanciones)
        // dispatch( infoFormAlbum( albumInfo ) );
        
    }, [albumValues]);

    const handleSongAmount = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            const arr = createArraysOfSongs(albumValues, amountObj);
            dispatch( createInputsSongs( arr ) );
            localStorage.setItem( 'albumAmount', JSON.stringify(albumValues) );
        
            // console.log(albumValues)
        }
    }
    // const handleSongAmount = (e) => {
        //         e.preventDefault();
        //         if (isSongAmountValid()) {
        //             const arr = createArraysOfSongs(amountObj);
        //             dispatch( createInputsSongs( arr ) );
        //         }
        
        //     }

    const isFormValid = () => {
        if ( albumValues.some((album, i) => album[`disco_${i + 1}`].trim().length === 0)) {
            dispatch( setError('Completá todos los campos') );
            return false;
        }
        dispatch( removeError() );
        return true;
    }

    return (
        <div id="input-songs">
            {
                albumValues.map( (vol, i) => ( 
                    <div
                    key={ `album ${ i }` } 
                    className="mb-3 d-flex justify-center mt-5 animate__animated animate__fadeInUp"
                    >                     
                    <div className="d-flex flex-column align-center">
                        <label htmlFor="numero_canciones" className="mb-3">
                            Número de canciones para el disco { i + 1 }
                        </label>
                        <div className="d-flex w-10 g-1 mb-1 min-h-4">
                            <InputNumberOfSongsPerAlbum
                                amount={albumValues}
                                volume={vol}
                                index={i}
                            />
                        </div> 
                    </div>
                </div>
                ))
            }
            {
                albumValues.length !== 0 &&
                <button
                    className="btn"
                    onClick={ handleSongAmount }
                >
                    Ok
                </button>
            }            

        </div>
    )
})
