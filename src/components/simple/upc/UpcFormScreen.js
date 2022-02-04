import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { useForm } from '../../../hooks/useForm';
import { HelpItem } from '../../ui/HelpItem';
import { InputsFields } from '../../ui/InputsFields';
import { infoFormSimple } from '../../../actions/post';
import { InputsRadioFields } from '../../ui/InputsRadioFields';
import { setMsg } from '../../../actions/ui';
import { getMessageById } from '../../../helpers/getMessageById';

export const UpcFormScreen = ({ data }) => {

    const { simpleInfo, simpleInfo: { codigo_barra } } = useSelector(state => state.simpleForm);
    const dispatch = useDispatch();

    // console.log(albumInfo)

    const { solicitaUpc, UPC } = data;

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

        document.querySelector('body').classList.remove('overflow');
        codigo_barra.solicitaUpc = requestCode;
        codigo_barra.UPC = barcode;
        dispatch( infoFormSimple( simpleInfo ) )

    }, [simpleInfo, requestCode, barcode, dispatch])

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
                
                <div className="mt-5 animate__animated animate__fadeInUp d-flex align-items-center m-auto">
                    
                    <HelpItem classname={"visible-hidden"}/>
                    <InputsFields
                        label="Escribí tú código UPC"
                        type="text"
                        name="UPC"
                        value={ barcode }
                        id="codigo"
                        onChange={ handleInputChange }
                    />
                    <HelpItem content={ "?" } onClick={() => handleClick('upc')}/>
                </div>
            }
        </>
    )
}
