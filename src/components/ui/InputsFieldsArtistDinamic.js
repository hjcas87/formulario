import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { infoFormAlbum } from '../../actions/post'
// import { useForm } from '../../hooks/useForm'
import { ButtonItem } from './ButtonItem'
import { HelpItem } from './HelpItem'
import { InputsFields } from './InputsFields'

export const InputsFieldsArtistDinamic = React.memo(({ index, artistasSecundarios}) => {

    // console.log('inputFieldartistDinamic')
    const dispatch = useDispatch();

    const { albumInfo } = useSelector(state => state.form)

    const [artSecundarios, setArtSecundarios] = useState()
    
    useEffect(() => {
        
        setArtSecundarios(artistasSecundarios)

    }, [artistasSecundarios])

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
        albumInfo.artistas_secundarios = data
        dispatch( infoFormAlbum( albumInfo ) )
        setArtSecundarios( [...data] );
    };

    // // console.log(formValues.artista_secundario)
    return (
        <>
            {
                artSecundarios &&
                <>
                <div className="input_group">
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

// label={ `Artista Secundario Nº${i + 1}` }
//                                 type="text"
//                                 name={ Object.keys( field ) }
//                                 value={ Object.values( field ) }
//                                 id={ `artista_secundario_${i + 1}` }
//                                 index={ i }