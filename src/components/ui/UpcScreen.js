import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";



export const UpcScreen = () => {

    const data = JSON.parse(localStorage.getItem('upcValues')) || [] ;

    const { codigo_barra: codeRequested, codigo: code } = data;

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

    // console.log({requestCode, barcode})

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log('enviando...')
        
        localStorage.setItem( 'upcValues', JSON.stringify(formValues) );
        navigate('/album/selection');
    }

    return (
        <>
            <h1>Código de barras (UPC)</h1>

            <p>Un código de barras (UPC) le da a tu álbum un identificador exclusivo para la distribución digital y física.</p>
            <p className="negrita-medium">Para mayor información sobre los códigos de barra (UPC)<a className="enlaces" href="https://es.wikipedia.org/wiki/C%C3%B3digo_Universal_de_Producto"> ingresa acá</a></p>
            
            <form onSubmit={ handleSubmit }>
                <div className="radio">
                    <input 
                        type="radio"
                        className="radio__field"
                        id="quiere_upc"
                        name="codigo_barra"
                        value={ valorUno }
                        onChange={ handleInputChange }
                        onClick={ () => formValues.codigo = '' }
                        checked={ requestCode === valorUno }
                    />
                    <label htmlFor="quiere_upc" className="radio__label negrita-medium">Necesito un código de barras.</label>
                </div>
                <div className="radio">
                    <input
                        type="radio"
                        className="radio__field"
                        id="no_quiere_upc"
                        name="codigo_barra"
                        value={ valorDos }
                        onChange={ handleInputChange } 
                        checked={ requestCode === valorDos }
                    />
                    <label htmlFor="no_quiere_upc" className="radio__label negrita-medium">Ya tengo un código de barras.</label>
                </div>

                {
                    requestCode === valorDos &&
                        <input
                            type="text"
                            className="radio__field"
                            name="codigo"
                            value={ barcode }
                            onChange={ handleInputChange } 
                        />
                }

                <button>
                    ok
                </button>

            </form>
        </>
    )
}
