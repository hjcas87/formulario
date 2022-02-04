import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { infoFormSimple } from "../../../actions/post";
import { removeError, removeMsg, setError } from "../../../actions/ui";
import { getLocalStorage } from "../../../helpers/getLocalStorage";
import { UpcFormScreen } from "./UpcFormScreen";

export const UpcScreen = () => {

    const { simpleData, simpleData: { codigo_barra } } = useMemo(() => getLocalStorage(), []);

    const { simpleInfo } = useSelector(state => state.simpleForm);

    const dispatch = useDispatch();

    const { msgError, msg } = useSelector( state => state.ui);

    useEffect(() => {
        dispatch( removeError() )
        dispatch( removeMsg() )
        dispatch( infoFormSimple( simpleData ) )
    }, [])


    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(simpleInfo)
        if (isUpcScreenValid()) {
            console.log(simpleInfo)
            dispatch( infoFormSimple( simpleInfo ) )
            localStorage.setItem( 'simpleInfo', JSON.stringify( simpleInfo ) );
            animationScreenNavigate();

        }
    }

    const animationScreenNavigate = () => {
        const screen = document.querySelector('#upc_info');
        screen.classList.remove('animate__fadeInRight');
        screen.classList.add('animate__fadeOutLeft', 'animate__faster');
        screen.addEventListener('animationend', () => {
            
            navigate('/simple/songs');
        
        });
    };

    const isUpcScreenValid = () => {

        if ( simpleInfo.codigo_barra.solicitaUpc.trim().length === 0) {
            dispatch( setError('Decinos si tenes un código de barra para este lanzamiento') );
            return false;
        };
        if ( simpleInfo.codigo_barra.solicitaUpc.trim() === 'no_quiere_upc' ) {
            if ( simpleInfo.codigo_barra.UPC.trim().length === 0) {
                dispatch( setError('Decinos el código de barras por favor') );
                return false;
            } 
        };
        dispatch( removeError() );
        return true;
    }
    const handleClose = () => {
        dispatch( removeMsg() );
        document.querySelector('body').classList.remove('overflow');
    }

    return (
        <div className="main-container">
        <div className="text-secondary py-5 text-center animate__animated animate__fadeIn" id="upc_info">
                
                <div className="py-5 mt-5">  
                { 
                    msg &&
                        (
                            <div className="msg_container">
                                <div className="help_msg animate__animated animate__slideInDown">
                                    <div className="d-flex justify_rigth" onClick={ handleClose }>
                                        <div className="close d-flex justify-center align-center">
                                            X
                                        </div>
                                    </div>
                                    { msg }
                                </div>
                            </div>
                        )
                }
                <h1 className="text-white">Código de barras (UPC)</h1>
                <div className="p-2">
                    <p className="text-white">Un código de barras (UPC) le da a tu álbum un identificador exclusivo para la distribución digital y física.</p>
                    <p className="text-white">Para mayor información sobre los códigos de barra (UPC)<a className="enlaces" href="https://es.wikipedia.org/wiki/C%C3%B3digo_Universal_de_Producto"> ingresa acá</a></p>
                </div>
                <div className="col-auto">

                    <form onSubmit={ handleSubmit }>
                        { 
                            msgError &&
                                (
                                    <div className="error">
                                        { msgError }
                                    </div>
                                )
                        }
                       
                        <UpcFormScreen data={ codigo_barra }/>

                        <button className="btn mt-5">
                            Guardar y continuar
                        </button>

                    </form>
                </div>
            </div>
        </div>
        
        </div>
    )
}
