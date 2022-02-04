import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { createInput, createInputsSongs } from "../../../actions/ui"
import { createArraysOfSongs } from "../../../helpers/createArrayOfAlbumsWithSongs"
import { InputsFieldsNameOfSongs } from "../../ui/InputsFieldsNameOfSongs"


export const SelectNamesOfSongs = React.memo(({ local, albumValues }) => {

    let { amountObj, amount } = useSelector( state => state.ui );
    let { albumInfo } = useSelector( state => state.albumForm );
    const dispatch = useDispatch()

    console.log(local)
    useEffect(() => {
        dispatch( createInput(amountObj) )
    }, [amount])
    useEffect(() => {
        console.log(albumValues)
        const arr = createArraysOfSongs(albumInfo.albumValues);
        console.log(arr);
        dispatch( createInputsSongs( arr ) );
    }, []);

    return (
        <>
        
            <div id="input-titles" className="mt-5">
                {
                    amountObj.map(( album, index ) => (
                        <div 
                            key={ index }
                            className="animate__animated animate__fadeInUp"
                        >
                            <h4 className="text-white text-align-left fs-3 fw-300">Titulos de las canciones del disco {index + 1}</h4>
                            {
                                
                                amountObj[index].length === 0 ?

                                    <p className="text-align-left">
                                        Aún no has agregado canciones para este volumén
                                    </p> 
                                :

                                <InputsFieldsNameOfSongs 
                                    albumsAndSongsValues={ amountObj }
                                    album={album}
                                    local={local[index]}
                                    index={index}
                                />
                                
                            }
                        </div>  
                    ))
                }

            </div>
        </>
    )
})
