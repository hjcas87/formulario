import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { useForm } from '../../../hooks/useForm';
import { HelpItem } from '../../ui/HelpItem';
import { InputsFields } from '../../ui/InputsFields';
import { infoFormAlbum } from '../../../actions/post';
import { InputsRadioFields } from '../../ui/InputsRadioFields';

export const UpcFormScreen = ({ data }) => {

    const { albumInfo } = useSelector(state => state.form);
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

        console.log(albumInfo)
        albumInfo.solicitaUpc = requestCode;
        albumInfo.UPC = barcode;
        dispatch( infoFormAlbum( albumInfo ) )

    }, [albumInfo, requestCode, barcode, dispatch])

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
                    <HelpItem content={ "?" }/>
                </div>
            }
        </>
    )
}
