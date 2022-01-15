import React, { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FieldInput } from "../ui/FieldInput"
import { InputNumberOfSongsPerAlbum } from "../ui/InputNumberOfSongsPerAlbum"


export const SelectNumberOfSongsPerAlbum = React.memo(() => {
    console.log('SelectNumberOfSongsPerAlbum se llamo')


    const { albumsAmount = []} = useSelector(state => state.form)

    return (
        <div id="input-songs">
            {
                albumsAmount.map( (vol, i) => ( 
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
                                amount={albumsAmount}
                                volume={vol}
                                index={i}
                            />
                        </div> 
                    </div>
                </div>
                ))
            }
            {
                albumsAmount.length !== 0 &&
                <button
                    className="btn"
                    // onClick={ handleSongAmount }
                >
                    Ok
                </button>
            }            

        </div>
    )
})
