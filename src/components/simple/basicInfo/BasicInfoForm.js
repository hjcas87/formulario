

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { infoFormAlbum } from "../../../actions/post";
import { useForm } from "../../../hooks/useForm";
import { HelpItem } from "../../ui/HelpItem";
import { InputsFields } from "../../ui/InputsFields";
import { InputsFieldsArtist } from "../../ui/InputsFieldsArtist";


export const BasicInfoForm = React.memo(({ simpleData }) => {
    
    const dispatch = useDispatch()
    const { albumInfo } = useSelector(state => state.form)
    
    const {
        idioma,
        artista_principal,
        titulo_album,
        fecha_lanzamiento,
        artistas_secundarios,
        UPC,
        solicitaUpc,
        cancion,
        simpleStarted,
        generoYLocalizacion,
        codigo_ISRC,
        num_codigo } = simpleData;
        
    console.log(simpleData)

    const [ formValues, handleInputChange ] = useForm({
        idioma,
        artista_principal,     
        titulo_album,
        fecha_lanzamiento,
        artistas_secundarios,
        UPC,
        solicitaUpc,
        cancion,
        simpleStarted,
        generoYLocalizacion,
        codigo_ISRC,
        num_codigo
    });


    const handleValueChange = () => {
        dispatch( infoFormAlbum( formValues ) )
    }

    return (
        

        <form className="py-5">

            <div className="mb-3 d-flex ">
                <InputsFields
                    label="Idioma del Sencillo"
                    type="text"
                    name="idioma"
                    value={ formValues.idioma }
                    id="idioma"
                    onChange={ handleInputChange }
                    onBlur={ handleValueChange } 
                />
                <HelpItem content={ "?" }/>
            </div>

            <div className="mb-3 d-flex flex-column">
                <InputsFieldsArtist
                    data={ simpleData }
                />
            </div>
                
        <div className="mb-3 d-flex">
            <InputsFields 
                label="Título del Sencillo"
                type="text"
                name="titulo_album"
                value={ formValues.titulo_album }
                id="titulo_album"
                onChange={ handleInputChange }
                onBlur={ handleValueChange }
            />
        </div>

        <div className="mb-3 d-flex">
            <InputsFields
                label="Fecha de Lanzamiento"
                type="date"
                name="fecha_lanzamiento"
                value={ formValues.fecha_lanzamiento }
                id="fecha"
                onChange={ handleInputChange }
                onBlur={ handleValueChange }
            />
            <HelpItem content={ "?" }/>
        </div>

            
        </form>
        
    )
})
