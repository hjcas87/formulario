import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { infoFormAlbum } from '../../actions/post'
import { setMsg } from '../../actions/ui'
import { getMessageById } from '../../helpers/getMessageById'
import { useForm } from '../../hooks/useForm'
import { ButtonItem } from './ButtonItem'
import { HelpItem } from './HelpItem'
import { InputsFields } from './InputsFields'
import { InputsFieldsDinamics } from './InputsFieldsDinamics'

export const InputsFieldsArtist = React.memo(({ data, artista }) => {
    
    console.log(data)
    
    const { albumInfo = data} = useSelector(state => state.albumForm)

    const { info_basica } = albumInfo;
    
    const dispatch = useDispatch()

    const [formValues, handlenputChange] = useForm({
        artista_principal: artista
    })

    console.log(formValues)
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
                    flexDirection="input_group"
                    className="form-control"
                />
                <div className="d-flex">
                    <ButtonItem
                        content="+"
                        onClick={ addInputField }
                    />
                    <HelpItem content={ "?" } onClick={() => handleClick('artista_principal')}/>
                </div>
            </div>
            <InputsFieldsDinamics artistasSecundarios={ data.artistas_secundarios }/>
        </>
    )
})
