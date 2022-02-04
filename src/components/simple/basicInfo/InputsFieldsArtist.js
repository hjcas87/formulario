import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { infoFormSimple } from '../../../actions/post'
import { setMsg } from '../../../actions/ui'
import { getMessageById } from '../../../helpers/getMessageById'
import { useForm } from '../../../hooks/useForm'
import { ButtonItem } from '../../ui/ButtonItem'
import { HelpItem } from '../../ui/HelpItem'
import { InputsFields } from '../../ui/InputsFields'

export const InputsFieldsArtist = React.memo(({ data }) => {
    console.log(data)

    const { artista_principal, artistas_secundarios } = data;

    const { simpleInfo = data } = useSelector(state => state.simpleForm)

    const { info_basica } = simpleInfo;
    
    const [artistasSecundarios, setArtistasSecundarios] = useState(artistas_secundarios);

    const dispatch = useDispatch()

    const [formValues, handlenputChange] = useForm({
        artista_principal
    })

    const addInputField = () => {
        const obj = {};
        obj.artista_secundario = '';
        setArtistasSecundarios([...artistasSecundarios, {...obj}])
    };

    const handleInputChange = ({target}, index) => {
        const newData = artistasSecundarios.map(( field, i ) => {
            if (index === i) {
                field[target.name] = target.value;
            }
            return field;
        });
        setArtistasSecundarios([...newData]);
    }
    
    const deleteInputFields = ( indx ) => {
        const data = artistasSecundarios.filter( (f, i) => i !== indx);
        setArtistasSecundarios( [...data] );
    };

    const handleValueChange = () => {
        info_basica.artista_principal = formValues.artista_principal
        info_basica.artistas_secundarios = artistasSecundarios
        dispatch( infoFormSimple( simpleInfo ) )
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
                />
                <div className="d-flex">
                    <ButtonItem
                        content="+"
                        onClick={ addInputField }
                    />
                    <HelpItem content={ "?" } onClick={() => handleClick('artista_principal')}/>
                </div>
            </div>
            {
                artistasSecundarios.map( (field, i) => (
                    <div key={ i } className="animate__animated animate__fadeInUp">
                        <div className="mb-3 d-flex flex-column">
                            <div className="d-flex"> 
                                <div className="input_group">
                                    <label htmlFor={`artista_secundario_${i + 1}`} className="mb-1">Artista Secundario Nº{i + 1}</label>
                                    <input 
                                        type="text"
                                        autoComplete="off"
                                        className="form-control"
                                        name={ Object.keys(artistasSecundarios[i]) }
                                        value={ Object.values(artistasSecundarios[i]) }
                                        id={`artista_secundario_${i + 1}`}
                                        onChange={ (e) => handleInputChange(e, i) }
                                        onBlur={ handleValueChange }
                                    />

                                </div>
                                <div className="d-flex">
                                    <ButtonItem
                                        content="-"
                                        onClick={ () => deleteInputFields(i) }
                                    />
                                    <HelpItem classname={'visible-hidden'} />
                                </div>
                            </div>
                        </div>                                
                    </div>
                ))
            }
        </>
    )
})
