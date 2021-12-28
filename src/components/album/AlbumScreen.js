import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import { useDinamicForm } from "../../hooks/useDinamicForm";
import { useForm } from "../../hooks/useForm"
import { infoFormAlbum } from "../../actions/post";

export const AlbumScreen = () => {

    const dispatch = useDispatch()

    const { post } = useSelector(state => state.form);

    const navigate = useNavigate();

    const data = JSON.parse(localStorage.getItem('formValues')) || {};

    const { idioma: lang, artista_principal: artist, titulo_album: title, fecha_lanzamiento: date, artistas_secundarios} = data;
 
    const [ artistasSecundarios, addInputField, deleteInputFields, changes ] = useDinamicForm( artistas_secundarios || [] )

    const [ formValues, handleInputChange ] = useForm({
        idioma: lang || '',
        artista_principal: artist || '',     
        titulo_album: title || '',
        fecha_lanzamiento: date || '',
    });

    const { idioma, artista_principal, titulo_album, fecha_lanzamiento } = formValues;
        
    const handleSubmit = (e) => {
        e.preventDefault();

        // if ( isValidate( formValues ) ) {
            formValues.artistas_secundarios = artistasSecundarios;
            dispatch( infoFormAlbum( formValues ) );
            localStorage.setItem( 'formValues', JSON.stringify(formValues) );
            navigate('/upc');
        // }
    };

    console.log(artistasSecundarios)
    return (
        <>
            <header className="header centrar-texto">
                <h1>Formulario-Álbum</h1>
            </header>

            <form>
                <div><h2>Informacion Básica</h2></div>   
                <div>
                    <label htmlFor="idioma" className="campo__label negrita-medium">Idioma del Álbum</label>
                    <input 
                        type="text"
                        className="campo__field"
                        name="idioma"
                        value={ idioma }
                        id="idioma"
                        onChange={ handleInputChange }
                    />
                </div>

                <div className="campo__corto">
                    <label htmlFor="nombre" className="campo__label negrita-medium">Nombre del Artista</label>
                    <input
                        type="text"
                        className="campo__field"
                        name="artista_principal"
                        value={ artista_principal }
                        id="nombre"
                        onChange={ handleInputChange }
                    />
                    
                    <p
                        className="campo__ayuda--add"
                        onClick={ () => addInputField( 'artista_secundario' ) }
                    >
                        +
                    </p>

                    {
                        artistasSecundarios.map( (field, i) => (
                            <div key={ i } >
                                <input
                                    type="text"
                                    className="campo__field"
                                    name={ Object.keys( field ) }
                                    value={ Object.values( field ) }
                                    onChange={ (e) => changes(e, i) }
                                /> 
                                <p
                                    className="campo__ayuda--add"
                                    onClick={ () => deleteInputFields(i)}
                                >
                                    -
                                </p>
                            </div>
                        ))
                    }

                </div>

                <div className="campo">
                    <label htmlFor="titulo_album" className="campo__label negrita-medium">Título del Álbum</label>
                    <input
                        type="text"
                        className="campo__field"
                        name="titulo_album"
                        value={ titulo_album }
                        id="titulo_album"
                        onChange={ handleInputChange }
                    />
                </div>

                <div className="campo">
                    <label htmlFor="fecha" className="campo__label negrita-medium">Fecha de Lanzamiento</label>
                    <input
                        type="date"
                        className="campo__field"
                        name="fecha_lanzamiento"
                        value={ fecha_lanzamiento }
                        id="fecha"
                        onChange={ handleInputChange }
                    />
                </div>

                <button
                    onClick={ handleSubmit }
                >
                    ok
                </button>

            </form>


        </>
    )
}
