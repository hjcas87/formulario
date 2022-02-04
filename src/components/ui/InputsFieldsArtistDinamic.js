import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { infoFormAlbum } from '../../actions/post'
import { ButtonItem } from './ButtonItem'
import { HelpItem } from './HelpItem'

export const InputsFieldsArtistDinamic = React.memo(({ index, artistasSecundarios}) => {

    const dispatch = useDispatch();

    const { albumInfo } = useSelector(state => state.albumForm)

    const [artSecundarios, setArtSecundarios] = useState()
    console.log(artSecundarios)
    
    useEffect(() => {
        
        setArtSecundarios(artistasSecundarios)

    }, [artistasSecundarios])

    
    const handleInputChange = ({target}) => {
        const newData = artSecundarios.map(( field, i ) => {
            if (index === i) {
                field[target.name] = target.value;
            }
            return field;
        });
        setArtSecundarios([...newData]);
    }

    
    const deleteInputFields = ( i ) => {
        const data = artSecundarios.filter( (f, i) => i !== index);
        albumInfo.info_basica.artistas_secundarios = data
        dispatch( infoFormAlbum( albumInfo ) )
        setArtSecundarios( [...data] );
    };

    return (
        <>
            {
                artSecundarios &&
                <>
                <div className="input-group">
                    <label htmlFor={`artista_secundario_${index + 1}`} className="mb-1">Artista Secundario Nº{index + 1}</label>
                    <input 
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        name={ Object.keys(artSecundarios[index]) }
                        value={ Object.values(artSecundarios[index]) }
                        id={`artista_secundario_${index + 1}`}
                        onChange={ handleInputChange }
                    />
                </div>
                <div className="d-flex">
                    <ButtonItem
                        content="-"
                        onClick={ () => deleteInputFields(index) }
                        arg={ index }
                    />
                    <HelpItem classname={'visible-hidden'} />
                </div>
                </>
            } 
        
        </>
    )
})