import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"

import { infoFormAlbum } from "../../../actions/post";
import { createInputsSongs, removeError, removeMsg, setError, setMsg } from "../../../actions/ui";
import { getLocalStorage } from "../../../helpers/getLocalStorage";
import { getMessageById } from "../../../helpers/getMessageById";
import { replaceSong } from "../../../helpers/replaceSong";
import { useForm } from "../../../hooks/useForm";
import { useFormDinamic } from "../../../hooks/useFormDinamic";
import { useFormDinamicComposers } from "../../../hooks/useFormDinamicComposers";
import { getSongById } from "../../../selectors/getSongById";
import { ButtonItem } from "../../ui/ButtonItem";
import { HelpItem } from "../../ui/HelpItem";
import { InputsFields } from "../../ui/InputsFields";



export const SongScreen = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { id } = useParams();

    const { msgError, msg } = useSelector( state => state.ui);

    const { albumInfo } = useSelector( state => state.albumForm);

    const { data, data: { info_basica }, dataSong } = useMemo(() => getLocalStorage(), []);

    const { artista_principal, artistas_secundarios } = info_basica;
    
    useEffect(() => {
        dispatch( infoFormAlbum( data ) );
    }, []);

    useEffect(() => {
        window.scroll({ top: 0, left: 0 });
        document.querySelector('body').classList.remove('overflow');
        dispatch( removeError() );
        dispatch( removeMsg() );
    }, []);
    
    let song = getSongById( dataSong, id ) || {};
    const {
        artistas_destacados,
        composicion,
        compositores,
        idioma,
        lenguaje_explicito,
        titulo,
        otro_idioma,
        version,
        
    } = song;

    const [ composers, onAdd, onDelete, changes ] = useFormDinamicComposers( compositores );
    
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
        song = formValues
        song.artistas_destacados = artistaDestacado;
        song.compositores = composers;
        song.id = id;
        song.titulo = titulo;
        console.log(Object.values(song))
        if (isSongValidate()) {
            const newArr = replaceSong( dataSong, song )
            albumInfo.albumsYCanciones = newArr;
            localStorage.setItem( 'albumFormValues', JSON.stringify(newArr) );
            localStorage.setItem( 'albumInfo', JSON.stringify(albumInfo) );
            dispatch( createInputsSongs( newArr ) );
            animationScreenNavigate();
        }
    }

    const animationScreenNavigate = () => {
        const screen = document.querySelector('#info-screen');
        screen.classList.remove('animate__fadeInRight');
        screen.classList.add('animate__fadeOutLeft', 'animate__faster');
        screen.addEventListener('animationend', () => {
            
            navigate('/album/songs');
        
        });
    };
    
    const isSongValidate = () => {

        if ( song.lenguaje_explicito.trim().length === 0) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            dispatch( setError('Por favor dinos si esta canción contiene lenguaje explícito') );
            return false;
        } else if (song.artistas_destacados.length !== 0 && song.artistas_destacados.some( artist => artist.rol.trim().length === 0 )) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            dispatch( setError('Por favor dinos el rol de los artistas destacados') );
            return false;
        } else if (song.artistas_destacados.length !== 0 && song.artistas_destacados.some( artist => artist.artista_destacado.trim().length === 0 )) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            dispatch( setError('Por favor dinos los nombres de los artistas destacados') );
            return false;
        } else if ( song.idioma.trim().length === 0) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            dispatch( setError('Por favor dinos en que idioma se canta esta canción o si es una canción instrumental') );
            return false;
        } else if ( song.idioma.trim() === "Otro" && song.otro_idioma.trim().length === 0 ) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            dispatch( setError('Por favor dinos en que idioma se canta esta canción o si es una canción instrumental') );
            return false;
        } else if ( song.version.trim().length === 0) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            dispatch( setError('Por favor dinos si esta versión es en vivo o no') );
            return false;
        } else if ( song.composicion.trim().length === 0) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            dispatch( setError('Por favor dinos que tipo de composición es esta') );
            return false;
        } else if ( song.compositores.length === 0 ) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            dispatch( setError('Deberias agregar al menos un compositor para esta canción') );
            return false;
        } else if ( song.compositores.some( composer => composer.compositor.trim().length === 0  ) ) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            dispatch( setError('Dinos el nombre del compositor') );
            return false;
        } else if ( song.compositores.some( composer => composer[Object.keys(composer)[1]].trim().length === 0 ) ) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            dispatch( setError('Completá todos los campos') );
            return false;
        }
        dispatch( removeError() );
        return true;
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
    const handleClose = () => {
        dispatch( removeMsg() );
        document.querySelector('body').classList.remove('overflow');
    }

    return (
        <div className="main-container">
            <div className="text-secondary text-align-left animate__animated animate__fadeIn" id="info-screen">
            
                <div className="py-5 mt-5">
                    
                    <h1 className="text-align-left text-transform">{ titulo }</h1>

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
                        <div className="input-group">
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
                                <div className="input-group text-align-left">
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
                                    <div className="input-group">
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
                <hr />

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
                    <hr />

                <div className="d-flex align-center">
                    <p className="text-white">2-Idioma de la letra</p>
                    <HelpItem content={ "?" } onClick={() => handleClick('idioma_cancion')}/>
                </div>

                <p className="mb-1">En que idioma se canta la letra de tu cancion:</p>
                <div className="d-flex flex-column mb-3">
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
                    <hr />

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
                <hr />
                
                <div className="d-flex align-center">
                    <p className="text-white">4-Tipo de composición</p>
                    <HelpItem content={ "?" } onClick={() => handleClick('composicion')}/>
                </div>
                <div className="d-flex justify-left mb-3">
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
                            <p className="text-white">Nombre del compositor de esta canción.</p>
                            <InputsFields
                                type="text"
                                className="form-control"
                                index={ index }
                                name="compositor"
                                value={ field.compositor || ''}
                                onChange={ changes }
                            />

                            <div className="radio__field--generado">
                                <p>Como contribuyó este artista en esta canción.</p>
                                <div className="d-flex justify-left mb-5">
                                    <div>
                                        <InputsFields
                                            type="radio"
                                            index={ index }
                                            id={`letra_${index + 1}`}
                                            name={ [Object.keys(field)[1]] }
                                            checked={ field[Object.keys(field)[1]] === 'Letra'}
                                            value="Letra"
                                            onChange={ (e) => changes(e, index) }
                                            label="Letra"
                                        />
                                        <InputsFields
                                            type="radio"
                                            index={ index }
                                            id={`musica_${index + 1}`}
                                            name={ [Object.keys(field)[1]] }
                                            checked={ field[Object.keys(field)[1]] === 'Música'}
                                            value="Música"
                                            onChange={ changes }
                                            label="Música"
                                        />
                                        <InputsFields
                                            type="radio"
                                            index={ index }
                                            id={`letra_y_musica_${index + 1}`}
                                            name={ [Object.keys(field)[1]] }
                                            checked={ field[Object.keys(field)[1]] === 'Letra y Música'}
                                            value="Letra y Música" 
                                            onChange={ changes }
                                            label="Letra y Música"
                                        />
                                        <InputsFields
                                            type="radio"
                                            index={index}
                                            id={`no_sabe_${index + 1}`}
                                            name={ [Object.keys(field)[1]] }
                                            checked={ field[Object.keys(field)[1]] === 'no_sabe'}
                                            value="no_sabe"
                                            onChange={ changes }
                                            label="No se"
                                        />
                                    </div>
                                </div>
                                <button 
                                    className="btn mb-5"
                                    onClick={ () => onDelete( index ) } 
                                >
                                    Eliminar
                                </button>
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
                        <div className="d-flex justify-evenly wrap">
                            <button 
                                className="btn mb-3"
                                onClick={ (e) => {
                                    e.preventDefault();
                                    navigate('/album/songs');
                                }}
                                >
                                Atras
                            </button>
                            <button 
                                className="btn mb-3"
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
