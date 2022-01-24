import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { infoFormAlbum } from '../../actions/post'
import { useForm } from '../../hooks/useForm'
import { ButtonItem } from './ButtonItem'
import { HelpItem } from './HelpItem'
import { InputsFields } from './InputsFields'
import { InputsFieldsDinamics } from './InputsFieldsDinamics'

export const InputsFieldsArtist = React.memo(({ data }) => {
    console.log(data)

    const { artista_principal, artistas_secundarios } = data;

    const { albumInfo, albumInfo: { info_basica } } = useSelector(state => state.form);

    // const { artistas_secundarios } = albumInfo;
    
    const [artistasSecundarios, setArtistasSecundarios] = useState(artistas_secundarios);

    useEffect(() => {
        info_basica.artistas_secundarios = artistasSecundarios;
        setArtistasSecundarios(artistas_secundarios);
    }, [artistasSecundarios]);
    
    const dispatch = useDispatch()

    const [formValues, handlenputChange] = useForm({
        artista_principal
    })

    const addInputField = () => {
        const obj = {};
        obj.artista_secundario = '';
        info_basica.artistas_secundarios = [...info_basica.artistas_secundarios, {...obj}];
        dispatch( infoFormAlbum( albumInfo ) )

    };

    const handleValueChange = () => {
        info_basica.artista_principal = formValues.artista_principal
        dispatch( infoFormAlbum( albumInfo ) )
    }

    return (
        <>
            <div className="d-flex mb-3">
                <InputsFields
                    label="Nombre del Artista/Banda"
                    type="text"
                    name="artista_principal"
                    value={ formValues.artista_principal }
                    id="nombre"
                    onChange={ handlenputChange }
                    onBlur={ handleValueChange }
                />
                <div className="d-flex">
                    <ButtonItem
                        content="+"
                        onClick={ addInputField }
                    />
                    <HelpItem content={ "?" }/>
                </div>
            </div>
            <InputsFieldsDinamics artistasSecundarios={ info_basica.artistas_secundarios }/>
        </>
    )
})
