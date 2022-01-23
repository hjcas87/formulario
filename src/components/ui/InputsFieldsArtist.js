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

    const { artista_principal } = data;

    const { albumInfo } = useSelector(state => state.form);

    const { artistas_secundarios } = albumInfo;
    
    const [artistasSecundarios, setArtistasSecundarios] = useState(artistas_secundarios);

    useEffect(() => {
        albumInfo.artistas_secundarios = artistasSecundarios;
        setArtistasSecundarios(albumInfo.artistas_secundarios);
    }, [artistasSecundarios]);
    
    const dispatch = useDispatch()

    const [artistaPrincipal, handlenputChange] = useForm({
        artista_principal: artista_principal || ''
    })

    const addInputField = () => {
        const obj = {};
        obj.artista_secundario = '';
        albumInfo.artistas_secundarios = [...albumInfo.artistas_secundarios, {...obj}];
        dispatch( infoFormAlbum( albumInfo ) )

    };

    const handleValueChange = () => {
        albumInfo.artista_principal = artistaPrincipal.artista_principal
        dispatch( infoFormAlbum( albumInfo ) )
    }

    return (
        <>
            <div className="d-flex mb-3">
                <InputsFields
                    label="Nombre del Artista/Banda"
                    type="text"
                    name="artista_principal"
                    value={ artistaPrincipal.artista_principal }
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
            <InputsFieldsDinamics artistasSecundarios={ albumInfo.artistas_secundarios }/>
        </>
    )
})
