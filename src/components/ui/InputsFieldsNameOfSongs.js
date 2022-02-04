import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createInput } from '../../actions/ui'
import { newAlbumsValues } from '../../helpers/newAlbumsValues';

export const InputsFieldsNameOfSongs = React.memo(({
    albumsAndSongsValues,
    album,
    local,
    index
}) => {

    const dispatch = useDispatch();

    const { albumInfo } = useSelector(state => state.albumForm)
    const { amount } = useSelector(state => state.ui)
    
    useEffect(() => {
        const newAlbum = newAlbumsValues( amount, index, local, album );
        setFormValues(newAlbum)
        
    }, [albumsAndSongsValues])
    
    const [formValues, setFormValues] = useState([]);

    useEffect(() => {
        
        albumsAndSongsValues[index] = formValues;
        albumInfo.albumsYCanciones = albumsAndSongsValues;

    }, [formValues]);

    const handleBlur = () => {
        dispatch( createInput(albumsAndSongsValues) )
    }

    const handleInputChange = ({target}, indx) => {
        const newData = formValues.map(( field, i ) => {
            if (indx === i) {
                field[target.name] = target.value;
            }
            return field;
        });
        setFormValues([...newData]);
    }
    return (

        formValues.map( (cancion, i) => (
            <div key={ album + i }
            className="mb-3"
        >
            <div className="d-flex justify-center align-center g-1">
                
                <div className="flex-fill">
                    <input
                        type="text"
                        autoComplete="off"    
                        className="form-control min-h-4 animate__animated animate__fadeInUp"
                        name="titulo"
                        value={ cancion.titulo }
                        onChange={(e) => handleInputChange(e, i)}
                        onBlur={ handleBlur }
                    />
                </div>
            </div>
        </div>
))
    )
})
