import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { infoFormSimple } from "../../../actions/post";
import { setMsg } from "../../../actions/ui";
import { getMessageById } from "../../../helpers/getMessageById";

import { useForm } from "../../../hooks/useForm";
import { HelpItem } from "../../ui/HelpItem";
import { InputsFields } from "../../ui/InputsFields";
import { InputsFieldsArtist } from "./InputsFieldsArtist";

export const BasicInfoForm = React.memo(({ simpleData }) => {
    
    const dispatch = useDispatch()
    const { simpleInfo } = useSelector(state => state.simpleForm)

    const { info_basica } = simpleData;

    const {
        artista_principal,
        artistas_secundarios,
        fecha_lanzamiento,
        idioma,
        titulo_album } = info_basica;
        
    console.log(simpleData)

    const [ formValues, handleInputChange ] = useForm({
        artista_principal,
        artistas_secundarios,
        fecha_lanzamiento,
        idioma,
        titulo_album 
    });


    const handleValueChange = () => {
        info_basica.titulo_album = formValues.titulo_album;
        info_basica.fecha_lanzamiento = formValues.fecha_lanzamiento;
        info_basica.idioma = formValues.idioma;
        // dispatch( infoFormSimple( formValues ) )
    }

    const handleClick = (id) => {
        const message = getMessageById( id );
        dispatch( setMsg( message.msg ) );
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        document.querySelector('body').classList.add('overflow');
        setTimeout(() => {
            document.querySelector('.msg_container').classList.add('msg_background');
        }, 600);
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
                <HelpItem content={ "?" } onClick={() => handleClick('idioma_lanzamiento')}/>
            </div>

            <div className="mb-3 d-flex flex-column">
                <InputsFieldsArtist
                    data={ info_basica }
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
            <HelpItem content={ "?" } onClick={() => handleClick('fecha')}/>
        </div>

            
        </form>
        
    )
})
