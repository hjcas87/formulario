

import React from "react";
// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { infoFormAlbum } from "../../../actions/post";
import { setMsg } from "../../../actions/ui";
import { getMessageById } from "../../../helpers/getMessageById";
import { useForm } from "../../../hooks/useForm";
import { HelpItem } from "../../ui/HelpItem";
import { InputsFields } from "../../ui/InputsFields";
import { InputsFieldsArtist } from "../../ui/InputsFieldsArtist";


export const BasicInfoForm = React.memo(({ data }) => {
    

    const dispatch = useDispatch()
    const { albumInfo = data  } = useSelector(state => state.albumForm);
    const { info_basica: basic_info } = albumInfo;
    
    const { info_basica } = data;

    const {
        artista_principal,
        artistas_secundarios,
        fecha_lanzamiento,
        idioma,
        titulo_album } = info_basica;
        
    console.log(info_basica)

    const [ formValues, handleInputChange ] = useForm({
        artista_principal,
        artistas_secundarios,
        fecha_lanzamiento,
        idioma,
        titulo_album
    });

    console.log(artista_principal)

    const handleValueChange = () => {
        console.log(formValues)
        info_basica.fecha_lanzamiento = formValues.fecha_lanzamiento
        info_basica.idioma = formValues.idioma
        info_basica.titulo_album = formValues.titulo_album
        dispatch( infoFormAlbum( albumInfo ) )
        console.log(basic_info)
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

            <div className="mb-3 d-flex">
                <InputsFields
                    label="Idioma del Álbum"
                    type="text"
                    name="idioma"
                    value={ formValues.idioma }
                    id="idioma"
                    onChange={ handleInputChange }
                    onBlur={ handleValueChange }
                    flexDirection="input_group"
                    className="form-control"
                />
                <HelpItem content={ "?" } onClick={() => handleClick('idioma_lanzamiento')}/>
            </div>

            <div className="mb-3 d-flex flex-column">
                <InputsFieldsArtist
                    data={ albumInfo.info_basica }
                    artista={ artista_principal }
                />
            </div>
                
            <div className="mb-3 d-flex">
                <InputsFields 
                    label="Título del Álbum"
                    type="text"
                    name="titulo_album"
                    value={ formValues.titulo_album }
                    id="titulo_album"
                    onChange={ handleInputChange }
                    onBlur={ handleValueChange }
                    flexDirection="input_group"
                    className="form-control"
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
                    flexDirection="input_group"
                    className="form-control"
                />
                <HelpItem content={ "?" } onClick={() => handleClick('fecha')}/>
            </div>

            
        </form>
        
    )
})
