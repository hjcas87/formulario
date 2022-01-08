import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { removeError, setError } from "../../actions/ui";
import { getLocalStorage } from "../../helpers/getLocalStorage";
import { useForm } from "../../hooks/useForm";



export const UpcScreen = () => {

    const { dataUpc } = useMemo(() => getLocalStorage(), []);

    const dispatch = useDispatch();

    const { msgError } = useSelector( state => state.ui);

    const { codigo_barra: codeRequested, codigo: code } = dataUpc;

    const navigate = useNavigate();

    const values = {
        valorUno: 'Se solicitó codigo de barra para este lanzamiento',
        valorDos: 'no_quiere_upc'
    };

    const { valorUno, valorDos } = values;
    
    const [ formValues, handleInputChange ] = useForm({
        codigo_barra: codeRequested || '',
        codigo: code || ''
    });

    const { codigo_barra: requestCode, codigo: barcode } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isUpcScreenValid()) {
            
            localStorage.setItem( 'upcValues', JSON.stringify(formValues) );
            animationScreenNavigate();

        }
    }

    const animationScreenNavigate = () => {
        const screen = document.querySelector('#upc_info');
        screen.classList.remove('animate__fadeInRight');
        screen.classList.add('animate__fadeOutLeft', 'animate__faster');
        screen.addEventListener('animationend', () => {
            
            navigate('/album/selection');
        
        });
    };

    const isUpcScreenValid = () => {

        if ( requestCode.trim().length === 0) {
            dispatch( setError('Decinos si tenes un código de barra para este lanzamiento') );
            return false;
        };
        if ( requestCode.trim() === valorDos ) {
            if ( barcode.trim().length === 0) {
                dispatch( setError('Decinos el código de barras por favor') );
                return false;
            } 
        };
        dispatch( removeError() );
        return true;
    }

    return (
        <>
        <div className=" text-secondary px-4 py-5 text-center flex-fill animate__animated animate__fadeInRight animate__faster" id="upc_info">
                
                <div className="py-5">
                <h1 className="display-5 fw-bold text-white">Código de barras (UPC)</h1>
                <p className="fw-ligth text-white">Un código de barras (UPC) le da a tu álbum un identificador exclusivo para la distribución digital y física.</p>
                <p className="fw-ligth text-white">Para mayor información sobre los códigos de barra (UPC)<a className="enlaces" href="https://es.wikipedia.org/wiki/C%C3%B3digo_Universal_de_Producto"> ingresa acá</a></p>
                
                <div className="col-automx-auto">

                    <form onSubmit={ handleSubmit }>
                    { 
                        msgError &&
                            (
                                <div className="error">
                                    { msgError }
                                </div>
                            )
                    }
                        
                        <div className="form-check d-flex justify-content-center mt-5 gap-4">
                            <input 
                                type="radio"
                                className="form-check-input"
                                name="codigo_barra"
                                id="quiere_upc"
                                value={ valorUno }
                                onChange={ handleInputChange }
                                onClick={ () => formValues.codigo = '' }
                                checked={ requestCode === valorUno }
                            />
                            <label htmlFor="quiere_upc" className="form-check-label">Necesito un código de barras.</label>
                        </div>
                        <div className="form-check d-flex justify-content-center mt-3 gap-4">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="codigo_barra"
                                id="no_quiere_upc"
                                value={ valorDos }
                                onChange={ handleInputChange } 
                                checked={ requestCode === valorDos }
                            />
                            <label htmlFor="no_quiere_upc" className="form-check-label">Ya tengo un código de barras.</label>
                        </div>

                        {
                            requestCode === valorDos &&
                            
                            <div className="mt-5 animate__animated animate__fadeInUp d-flex align-items-center m-auto">
                                <div className="help-container">
                                    <div className="">
                                    </div>
                                </div>
                                <div className="input_group">
                                    <input
                                        type="text"
                                        className="form-control fs-4"
                                        name="codigo"
                                        autoComplete="off"
                                        value={ barcode }
                                        onChange={ handleInputChange } 
                                    />
                                </div>
                                <div className="help-container">
                                    <div className="help-item">
                                        ?
                                    </div>
                                </div>
                            </div>
                        }

                        <button className="btn btn-outline-info btn-lg px-4 fw-bold mt-5">
                            Continuar
                        </button>

                    </form>
                </div>
            </div>
        </div>
        
        </>
    )
}
