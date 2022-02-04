import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { useForm } from '../../../hooks/useForm';
import { HelpItem } from '../../ui/HelpItem';
import { InputsFields } from '../../ui/InputsFields';
import { infoFormAlbum } from '../../../actions/post';
import { InputsRadioFields } from '../../ui/InputsRadioFields';
import { getMessageById } from '../../../helpers/getMessageById';
import { setMsg } from '../../../actions/ui';

export const UpcFormScreen = ({ data: { codigo_barra } }) => {

    const { albumInfo, albumInfo: { codigo_barra: bar_code } } = useSelector(state => state.albumForm);
    const dispatch = useDispatch();

    // console.log(albumInfo)

    const { solicitaUpc, UPC } = codigo_barra;

    const values = {
        valorUno: 'Se solicitó codigo de barra para este lanzamiento',
        valorDos: 'no_quiere_upc'
    };

    const { valorUno, valorDos } = values;
    
    const [ formValues, handleInputChange ] = useForm({
        solicitaUpc,
        UPC
    });

    const { solicitaUpc: requestCode, UPC: barcode } = formValues;


    useEffect(() => {

        albumInfo.albumStarted = true;
        bar_code.solicitaUpc = requestCode;
        bar_code.UPC = barcode;
        dispatch( infoFormAlbum( albumInfo ) )

    }, [albumInfo, requestCode, barcode, dispatch])

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
        <div className="text-white mt-7 d-flex flex-column align-top">
            <InputsRadioFields 
                name="solicitaUpc"
                id="quiere_upc"
                value={ valorUno }
                onChange={ handleInputChange }
                onClick={ () => formValues.UPC = '' }
                checked={ requestCode === valorUno }
            />

            <InputsRadioFields 
                name="solicitaUpc"
                id="no_quiere_upc"
                value={ valorDos }
                onChange={ handleInputChange }
                checked={ requestCode === valorDos }
            />

            {
                requestCode === valorDos &&
                
                <div className="mt-5 mb-3 animate__animated animate__fadeInUp d-flex w-100">
                    
                    <InputsFields
                        label="Escribí tú código UPC"
                        type="text"
                        name="UPC"
                        value={ barcode }
                        id="codigo"
                        onChange={ handleInputChange }
                        className="form-control"
                        flexDirection="input_group"
                    />
                    <HelpItem content={ "?" } onClick={() => handleClick('upc')}/>
                </div>
            }
        </div>
    )
}
