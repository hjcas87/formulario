import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import { infoFormAlbum } from "../../../actions/post";
import { removeError, removeMsg, setError } from "../../../actions/ui";
import { getLocalStorage } from "../../../helpers/getLocalStorage";
import { UpcFormScreen } from "./UpcFormScreen";

export const UpcScreen = () => {

    const { data } = useMemo(() => getLocalStorage(), []);

    const { albumInfo, albumInfo: { codigo_barra } } = useSelector(state => state.albumForm);

    const dispatch = useDispatch();

    const { msgError, msg } = useSelector( state => state.ui);

    useEffect(() => {
        window.scroll({ top: 0, left: 0 });
        dispatch( removeError() );
        dispatch( removeMsg() );
        document.querySelector('body').classList.remove('overflow');
    }, [])

    const { solicitaUpc, UPC } = codigo_barra;

    const navigate = useNavigate();

    console.log(albumInfo)

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(albumInfo)
        if (isUpcScreenValid()) {
            console.log(albumInfo)
            dispatch( infoFormAlbum( albumInfo ) )
            localStorage.setItem( 'albumInfo', JSON.stringify( albumInfo ) );
            animationScreenNavigate();

        }
    }

    const animationScreenNavigate = () => {
        const screen = document.querySelector('#info-screen');
        screen.classList.remove('animate__fadeInRight');
        screen.classList.add('animate__fadeOutLeft', 'animate__faster');
        screen.addEventListener('animationend', () => {
            
            navigate('/album/selection');
        
        });
    };

    const isUpcScreenValid = () => {

        console.log(solicitaUpc)
        if ( solicitaUpc.trim().length === 0) {
            dispatch( setError('Decinos si tenes un código de barra para este lanzamiento') );
            return false;
        };
        if ( solicitaUpc.trim() === 'no_quiere_upc' ) {
            if ( UPC.trim().length === 0) {
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
        <div className="text-secondary text-center animate__animated animate__fadeIn" id="info-screen">
                
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
                    <h1 className="text-align-left">Álbum</h1>
                    <h2 className="text-align-left">Código de barras (UPC)</h2>
                    <hr className="mt-3"/>
                <p className="text-align-left mt-3">Un código de barras (UPC) le da a tu álbum un identificador exclusivo para la distribución digital y física.</p>
                <p className="text-align-left">Para mayor información sobre los códigos de barra (UPC)<a className="enlaces" href="https://es.wikipedia.org/wiki/C%C3%B3digo_Universal_de_Producto"> ingresa acá</a></p>
                <div>
                    <form onSubmit={ handleSubmit }>
                        { 
                            msgError &&
                                (
                                    <div className="error">
                                        { msgError }
                                    </div>
                                )
                        }
                        <UpcFormScreen data={ data }/>

                        <hr />

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
