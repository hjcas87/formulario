import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { infoFormSimple } from "../../../actions/post";
import { removeError, removeMsg, setError, setMsg } from "../../../actions/ui";

import { getLocalStorage } from "../../../helpers/getLocalStorage";
import { getMessageById } from "../../../helpers/getMessageById";
import { useForm } from "../../../hooks/useForm";
import { useFormDinamic } from "../../../hooks/useFormDinamic";
import { useFormDinamicComposers } from "../../../hooks/useFormDinamicComposers";
import { ButtonItem } from "../../ui/ButtonItem";
import { HelpItem } from "../../ui/HelpItem";
import { InputsFields } from "../../ui/InputsFields";


export const SongScreen = () => {
    
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { simpleData } = getLocalStorage();

    const { msgError, msg } = useSelector( state => state.ui);

    const { cancion, info_basica } = simpleData;

    const { artista_principal, titulo_album, artistas_secundarios } = info_basica;

    useEffect(() => {
        dispatch( infoFormSimple( simpleData ) )
    }, [])

    useEffect(() => {
        dispatch( removeError() )
        dispatch( removeMsg() )
    }, [])

    const {
        artistas_destacados,
        composicion,
        compositores,
        titulo,
        idioma,
        lenguaje_explicito,
        otro_idioma,
        version,
        
    } = cancion;

    const [ composers, onAdd, onDelete, changes ] = useFormDinamicComposers( compositores );

    console.log(composers)

    const [ artistaDestacado, addArtist, deleteArtist, changesArtist ] = useFormDinamic(artistas_destacados);
    
    const [ formValues, handleInputChange ] = useForm({
        lenguaje_explicito,
        version,
        composicion,
        idioma,
        otro_idioma,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        formValues.artistas_destacados = artistaDestacado;
        formValues.compositores = composers;
        formValues.titulo = titulo_album;
        console.log(compositores)
        if ( songValidate() ) {
            simpleData.cancion = formValues;
            console.log(simpleData.cancion)
            localStorage.setItem( 'simpleInfo', JSON.stringify(simpleData) );
            navigate('/simple/genders');
        }
    }

    
    const songValidate = () => {

        if ( formValues.lenguaje_explicito.trim().length === 0) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            dispatch( setError('Por favor dinos si esta canción contiene lenguaje explícito') );
            return false;
        } else if (formValues.artistas_destacados.length !== 0 && formValues.artistas_destacados.some( artist => artist.rol.trim().length === 0 )) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            dispatch( setError('Por favor dinos el rol de los artistas destacados') );
            return false;
        } else if (formValues.artistas_destacados.length !== 0 && formValues.artistas_destacados.some( artist => artist.artista_destacado.trim().length === 0 )) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            dispatch( setError('Por favor dinos los nombres de los artistas destacados') );
            return false;
        } else if ( formValues.idioma.trim().length === 0) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            dispatch( setError('Por favor dinos en que idioma se canta esta canción o si es una canción instrumental') );
            return false;
        } else if ( formValues.idioma.trim() === "Otro" && formValues.otro_idioma.trim().length === 0 ) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            dispatch( setError('Por favor dinos en que idioma se canta esta canción o si es una canción instrumental') );
            return false;
        } else if ( formValues.version.trim().length === 0) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            dispatch( setError('Por favor dinos si esta versión es en vivo o no') );
            return false;
        } else if ( formValues.composicion.trim().length === 0) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            dispatch( setError('Por favor dinos que tipo de composición es esta') );
            return false;
        } else if ( formValues.compositores.length === 0 ) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            dispatch( setError('Deberias agregar al menos un compositor para esta canción') );
            return false;
        } else if ( formValues.compositores.some( composer => composer.compositor.trim().length === 0  ) ) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            console.log('fuck')
            dispatch( setError('Dinos el nombre del compositor') );
            return false;
        } else if ( formValues.compositores.some( composer => composer[Object.keys(composer)[1]].trim().length === 0 ) ) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            dispatch( setError('Completá todos los campos') );
            return false;
        }
        dispatch( removeError() );
        return true;
    }
    const handleClick = (id) => {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' })
        const message = getMessageById( id )
        dispatch( setMsg( message.msg ) )
    }
    const handleClose = () => {
        dispatch( removeMsg() )
    }


    return (
        <div className="main-container">
            <div className="text-secondary text-align-left animate__animated animate__fadeIn">
                
            
                <div className="py-5 mt-5">
                    
                    <h1 className="text-align-left text-transform">{ titulo_album }</h1>

                    <form onSubmit={ handleSubmit }>

                        {
                            msgError &&
                                (
                                    <div className="error">
                                        { msgError }
                                    </div>
                                )
                        }
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
                    
                        <div className="d-flex mb-3">
                            <div className="input_group">
                                <label htmlFor="nombre" className="mb-1">Artista principal</label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className="form-control"
                                    name="artista_principal"
                                    defaultValue={ artista_principal }
                                    readOnly
                                    id="nombre"
                                    onChange={ handleInputChange }
                                />
                            </div>
                            <div className="d-flex">
                                <ButtonItem
                                    content="+"
                                    onClick={ addArtist }
                                />
                                <HelpItem content={ "?" } onClick={() => handleClick('colaboradores')}/>
                            </div>
                        </div>
                        {
                            artistas_secundarios.map( (artist, i) => (
                                <div key={ i } className="mb-3 d-flex">
                                    <div className="input_group text-align-left">
                                        <label htmlFor="info_artista" className="mb-1">Artista secundario</label>
                                        <div className="d-flex">
                                            <input
                                                type="text"
                                                className="form-control"
                                                autoComplete="off"
                                                defaultValue={ artist.artista_secundario }
                                                name="artista_secundario"
                                                readOnly
                                            />
                                            <HelpItem classname={ 'visible-hidden' }/>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }


                {
                    artistaDestacado.map( ( artist, index ) => (
                        <div key={ `artist_${index}`} className="d-flex g-1">
                            <div className="d-flex flex-column w-100">
                                <select name="rol" className="mb-1 select" onChange={(e) => changesArtist(e, index)} value={artist.rol}>
                                    <option value="">Seleccioná un rol</option>
                                    <option value="Artista Destacado">Artista Destacado</option>
                                    <option value="Productor">Productor</option>
                                    <option value="Remixer">Remixer</option>
                                </select>
                                <div className="d-flex mb-3">
                                    <div className="input_group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="artista_destacado"
                                            value={ artist.artista_destacado || ''}
                                            onChange={(e) => changesArtist(e, index)}
                                        />
                                    </div>
                                    <div className="d-flex">
                                        <ButtonItem
                                            content="-"
                                            onClick={ () => deleteArtist(index) }
                                        />
                                        <HelpItem classname={ 'visible-hidden' }/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

                <h2>Detalles de la canción</h2>

                <div className="d-flex align-center">
                    <p className="text-white">1-¿Esta canción contiene lenguaje explícito?</p>
                    <HelpItem content={ "?" } onClick={() => handleClick('explicito')}/>
                </div>
                <div className="d-flex justify-left">
                    <div>
                        <div className="d-flex align-center g-1">
                            <input
                                type="radio"
                                className="radio__field"
                                value="No"
                                id="no_lenguaje"
                                name="lenguaje_explicito"
                                checked={formValues.lenguaje_explicito === 'No'}
                                onChange={ handleInputChange }
                            />
                            <label htmlFor="no_lenguaje">No</label>
                        </div>

                        <div className="d-flex align-center g-1">
                            <input
                                type="radio"
                                className="radio__field"
                                id="si_lenguaje"
                                value="Si"
                                name="lenguaje_explicito"
                                checked={formValues.lenguaje_explicito === 'Si'}
                                onChange={ handleInputChange }
                            />
                            <label htmlFor="si_lenguaje">Si</label>
                        </div>
                    </div>
                </div>

                <div className="d-flex align-center">
                    <p className="text-white">2-Idioma de la letra</p>
                    <HelpItem content={ "?" } onClick={() => handleClick('idioma_cancion')}/>
                </div>

                <p className="mb-1">En que idioma se canta la letra de tu cancion:</p>
                <div className="d-flex flex-column w-100">
                    <select onChange={ handleInputChange } name="idioma" value={ formValues.idioma } className="select mb-1">
                        <option value="">Seleccioná un idioma</option>
                        <option value="Español">Español</option>
                        <option value="Ingles">Ingles</option>
                        <option value="Instrumental">Instrumental</option>
                        <option value="Otro">Otro</option>
                    </select>
                    

                    {
                        formValues.idioma === 'Otro' &&  
                            <div className="w-50">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className="form-control"
                                    value={ otro_idioma }
                                    name="otro_idioma"
                                    onChange={ handleInputChange }
                                />
                            </div>
                    }
                </div>

                <div className="d-flex align-center">
                    <p className="text-white">3-¿Esta version esta grabada en vivo?</p>
                    <HelpItem content={ "?" } onClick={() => handleClick('version')}/>
                </div>
                
                <div className="d-flex justify-left">
                    <div>
                        <div className="d-flex align-center g-1">
                            <input
                                type="radio"
                                className="radio__field"
                                id="no_vivo"
                                name="version"
                                value="Grabación de estudio"
                                checked={formValues.version === 'Grabación de estudio'}
                                onChange={ handleInputChange }
                            />
                            <label htmlFor="no_vivo" className="radio__label">No</label>

                        </div>
                        <div className="d-flex align-center g-1">
                            <input
                                type="radio"
                                className="radio__field"
                                id="en_vivo"
                                name="version"
                                value="Grabación en vivo"
                                checked={formValues.version === 'Grabación en vivo'}
                                onChange={ handleInputChange }
                            />
                            <label htmlFor="en_vivo" className="radio__label">Si</label>

                        </div>
                    </div>
                </div>   
                
                <div className="d-flex align-center">
                    <p className="text-white">4-Tipo de composición</p>
                    <HelpItem content={ "?" } onClick={() => handleClick('composicion')}/>
                </div>
                <div className="d-flex justify-left mb-5">
                    <div>
                        <div className="d-flex align-center g-1">
                            <input
                                type="radio"
                                className="radio__field"
                                id="original"
                                name="composicion"
                                value="original"
                                checked={formValues.composicion === 'original'}
                                onChange={ handleInputChange }
                            />
                            <label htmlFor="original" className="radio__label">Composición original</label>
                        </div>
                        <div className="d-flex align-center g-1">
                            <input
                                type="radio"
                                className="radio__field"
                                id="cover"
                                name="composicion"
                                value="cover"
                                checked={formValues.composicion === 'cover'}
                                onChange={ handleInputChange }
                            />
                            <label htmlFor="cover" className="radio__label">Cover</label>
                        </div>    
                        <div className="d-flex align-center g-1">
                            <input
                                type="radio"
                                className="radio__field"
                                id="dominio"
                                name="composicion"
                                value="dominio_publico"
                                checked={formValues.composicion === 'dominio_publico'}
                                onChange={ handleInputChange }
                            />
                            <label htmlFor="dominio" className="radio__label">Dominio Público</label>
                        </div>
                    </div>
                </div>
                <hr />

                {
                    composers.map( ( field, index ) => (
                        <div key={ index } className="m-auto">
                            <p>Nombre del compositor de esta canción.</p>
                            <InputsFields
                                type="text"
                                className="form-control"
                                indexParent={ index }
                                name="compositor"
                                value={ field.compositor || ''}
                                onChange={ changes }
                            />
                            <div className="radio__field--generado">
                                <p>Como contribuyó este artista en esta canción.</p>
                                <div className="d-flex justify-left mb-5">
                                    <div>
                                        <div className="d-flex align-center g-1">
                                            <InputsFields
                                                type="radio"
                                                indexParent={ index }
                                                id={`letra_${index + 1}`}
                                                name={ Object.keys(field)[1] }
                                                checked={ field[Object.keys(field)[1]] === 'Letra'}
                                                value="Letra"
                                                onChange={ (e) => changes(e, index) }
                                            />
                                            <label htmlFor={`letra_${index + 1}`} className="radio__label negrita-medium">Letra.</label>
                                        </div>
                                        <div className="d-flex align-center g-1">
                                            <InputsFields
                                                type="radio"
                                                indexParent={ index }
                                                id={`musica_${index + 1}`}
                                                name={ Object.keys(field)[1] }
                                                checked={ field[Object.keys(field)[1]] === 'Música'}
                                                value="Música"
                                                onChange={ changes }
                                            />
                                            <label htmlFor={`musica_${index + 1}`} className="radio__label negrita-medium">Música.</label>
                                        </div>
                                        <div className="d-flex align-center g-1">
                                            <InputsFields
                                                type="radio"
                                                indexParent={ index }
                                                id={`letra_y_musica_${index + 1}`}
                                                name={ Object.keys(field)[1] }
                                                checked={ field[Object.keys(field)[1]] === 'Letra y Música'}
                                                value="Letra y Música" 
                                                onChange={ changes }
                                            />
                                            <label htmlFor={`letra_y_musica_${index + 1}`} className="radio__label negrita-medium">Letra y Música.</label>
                                        </div>
                                        <div className="d-flex align-center g-1">
                                            <InputsFields
                                                type="radio"
                                                indexParent={index}
                                                id={`no_sabe_${index + 1}`}
                                                name={ Object.keys(field)[1] }
                                                checked={ field[Object.keys(field)[1]] === 'no_sabe'}
                                                value="no_sabe"
                                                onChange={ changes }
                                            />
                                            <label htmlFor={`no_sabe_${index + 1}`} className="radio__label negrita-medium">No se.</label>
                                        </div> 
                                    </div>
                                </div>
                                <div className="d-flex justify-center">
                                    <button 
                                        className="btn mb-5"
                                        onClick={ (e) => {
                                            e.preventDefault();
                                            onDelete( index );
                                        }} 
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div> 
                            <hr />
                        </div>
                    ))
                }
                        <div className="d-flex mt-3">
                            <div
                                className="btn p-2 compositor text-center"
                                onClick={ onAdd }
                            >
                                + Agregar Compositor
                            </div>
                        </div>
                        <div className="d-flex justify-evenly">
                            <button 
                                className="btn"
                                >
                                Guardar y continuar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
