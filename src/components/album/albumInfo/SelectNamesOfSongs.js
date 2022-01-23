import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

import { infoFormAlbum } from "../../../actions/post"
// import { createArrayOfAlbumsWithSongs } from "../../../helpers/createArrayOfAlbumsWithSongs"
import { InputsFieldsNameOfSongs } from "../../ui/InputsFieldsNameOfSongs"


export const SelectNamesOfSongs = React.memo(({ local }) => {

    // const { albumValues,albumsAndSongsValues, albumInfo } = useSelector(state => state.form)

    const { amountObj } = useSelector( state => state.ui );
    const dispatch = useDispatch()

    // console.log(local)
    // console.log(albumValues)
    // console.log(amountObj)
    // useEffect(() => {
    //     // const arr = createArrayOfAlbumsWithSongs(albumValues, albumInfo.albumsYCanciones);
    //     // albumInfo.albumsYCanciones = arr;
    //     dispatch( infoFormAlbum( albumInfo ) )
    // }, [albumValues]);

    return (
        <>
        
            <div id="input-titles" className="mt-5">
                {
                    amountObj.map(( album, index ) => (
                        <div 
                            key={ index }
                            className="animate__animated animate__fadeInUp"
                        >
                            <h2 className="text-white title-song">Titulos de las canciones del disco {index + 1}</h2>
                            {
                                
                                amountObj[index].length === 0 ?

                                    <label htmlFor="numero_canciones">
                                        Aún no has agregado canciones para este volumén
                                    </label> 
                                :

                                <InputsFieldsNameOfSongs 
                                    albumsAndSongsValues={ amountObj }
                                    album={album}
                                />
                                
                            }
                        </div>  
                    ))
                }

            </div>
        </>
    )
})
