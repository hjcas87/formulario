import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useForm } from "../../hooks/useForm";
import { useFormDinamic } from "../../hooks/useFormDinamic";
import { getSongById } from "../../selectors/getSongById";
import { FieldInput } from "../ui/FieldInput";



export const SongScreen = () => {

    const data = JSON.parse(localStorage.getItem('formValues')) || {}
    const navigate = useNavigate();
    const { post = {}, postSongs } = useSelector(state => state.form);
    const { artista_principal = '', artistas_secundarios = [] } = post
    const { id } = useParams();

    const song = getSongById( postSongs, id );

    const initialValue = {
        compositor: ''
    }
    const [ compositores, onAdd, onDelete, changes ] = useFormDinamic(initialValue);
    const initialValues = {
        artista_destacado: '',
        rol: ''
    }
    const [ artistaDestacado, addArtist, deleteArtist, changesArtist ] = useFormDinamic(initialValues);

    const [ formValues, handleInputChange ] = useForm({
        lenguaje_explicito: '',
        version_en_vivo: '',
        composicion: '',
        idioma: '',
        otro_idioma: ''
    });

    console.log( artistaDestacado )
    console.log( compositores )

    const handleClick = (e) => {
        e.preventDefault();
        console.log(data)
        formValues.artistas_destacados = artistaDestacado;
        formValues.compositores = compositores;
        formValues.id = id;
        formValues.nombre_cancion = song.nombre;
        data.canciones = [];
        data.canciones = [...data.canciones, formValues]
        console.log(data)
        localStorage.setItem( 'formValues', JSON.stringify(data) );
        navigate('/album/songs');
    }


    if ( !song ) {
        return <Navigate to= '/album/songs' />
    }

    return (
        <section>
            
            <div className="left negrita-medium">
                <h4>{ song.nombre }</h4>
            </div>

                <div className="campo__corto">

                    <label htmlFor="info_artista" className="campo__label negrita-medium">Información del artista</label>

                    <input
                        type="text"
                        className="campo__field"
                        defaultValue={ artista_principal }
                        name="artista_principal"
                        onChange={ handleInputChange }
                    />
                    <p
                        onClick={ addArtist }
                    >+</p>

                </div>

                {
                    artistas_secundarios.length > 0 && 
                        artistas_secundarios.map( (artist, i) => (
                            <div className="campo__corto" key={ i }>

                                <label htmlFor="info_artista" className="campo__label negrita-medium">Artista secundario</label>

                                <input
                                    type="text"
                                    className="campo__field"
                                    defaultValue={ artist.artista_secundario }
                                    name="artista_secundario"
                                />

                            </div>
                        ))
                }
                {
                    artistaDestacado.map( ( artist, index ) => (
                        <div key={ `artist_${index}`}>
                            <div>
                                <select name="rol" onChange={(e) => changesArtist(index, e)}>
                                    <option value="artista_destacado">Artista Destacado</option>
                                    <option value="productor">Productor</option>
                                    <option value="remixer">Remixer</option>
                                </select>
    
                                <input
                                    type="text"
                                    name="artista_destacado"
                                    value={ artist.artista_destacado }
                                    onChange={(e) => changesArtist(index, e)}
                                />
                            </div>
                            <button onClick={() => deleteArtist(index)}>
                                Quitar
                            </button>
                        </div>
                    ))
                }

                <div className="left">
                    <h4>Detalles de la canción</h4>
                </div>

                <div className="detalles_canciones">
                    <p className="negrita-medium">1-¿Esta canción contiene lenguaje explícito?</p>                
                </div>

                <div className="radio">

                    <input
                        type="radio"
                        className="radio__field"
                        value="No"
                        id="no_lenguaje"
                        name="lenguaje_explicito"
                        onChange={ handleInputChange }
                    />

                    <label htmlFor="no_lenguaje" className="radio__label">No</label>

                </div>
                <div className="radio">

                    <input
                        type="radio"
                        className="radio__field"
                        id="si_lenguaje"
                        value="Si"
                        name="lenguaje_explicito"
                        onChange={ handleInputChange }
                    />

                    <label htmlFor="si_lenguaje" className="radio__label">Si</label>

                </div>

                <p className="negrita-medium">2-Idioma de la letra</p>

                <label>
                    En que idioma se canta la letra de tu cancion:
                <select onChange={ handleInputChange } name="idioma">
                    <option value="">Seleccioná un idioma</option>
                    <option value="Español">Español</option>
                    <option value="Ingles">Ingles</option>
                    <option value="Instrumental">Instrumental</option>
                    <option value="Otro">Otro</option>
                </select>
                </label>

                {
                    formValues.idioma === 'Otro' &&  
                        <div className="campo__corto">

                            <input
                                type="text"
                                className="campo__field"
                                name="otro_idioma"
                                onChange={ handleInputChange }
                            />

                        </div>

                }

                <p className="negrita-medium">3-¿Esta version esta grabada en vivo?</p>
                
                <div className="radio">

                    <input
                        type="radio"
                        className="radio__field"
                        id="no_vivo"
                        name="version_en_vivo"
                        value="No"
                        onChange={ handleInputChange }
                    />

                    <label htmlFor="no_vivo" className="radio__label">No</label>

                </div>
                <div className="radio">
                    <input
                        type="radio"
                        className="radio__field"
                        id="en_vivo"
                        name="version_en_vivo"
                        value="Si"
                        onChange={ handleInputChange }
                    />

                    <label htmlFor="en_vivo" className="radio__label">Si</label>

                </div>    
                
                <p className="negrita-medium">4-Tipo de composición</p>
                
                <div className="radio">

                    <input
                        type="radio"
                        className="radio__field"
                        id="original"
                        name="composicion"
                        value="original"
                        onChange={ handleInputChange }
                    />

                    <label htmlFor="original" className="radio__label">Composición original</label>

                </div>
                <div className="radio">

                    <input
                        type="radio"
                        className="radio__field"
                        id="cover"
                        name="composicion"
                        value="cover"
                        onChange={ handleInputChange }
                    />

                    <label htmlFor="cover" className="radio__label">Cover</label>

                </div>    
                <div className="radio">

                    <input
                        type="radio"
                        className="radio__field"
                        id="dominio"
                        name="composicion"
                        value="dominio_publico"
                        onChange={ handleInputChange }
                    />

                    <label htmlFor="dominio" className="radio__label">Dominio Público</label>

                </div>  

                {
                    compositores.map( ( field, index ) => (
                        <div key={ index }>
                            <p>Nombre del compositor de esta canción.</p>
                            <FieldInput
                                type="text"
                                indexParent={ index }
                                name="compositor"
                                value={ field.compositor }
                                onChange={ changes }
                            />

                            <div className="radio__field--generado">
                                <p>Como contribuyó este artista en esta canción.</p>
                                <div>
                                    <FieldInput
                                        type="radio"
                                        indexParent={ index }
                                        id={`letra_${index + 1}`}
                                        name={ `rol_autor_${index + 1}` }
                                        value="Letra"
                                        onChange={ changes }
                                    />
                                    <label htmlFor={`letra_${index + 1}`} className="radio__label negrita-medium">Letra.</label>
                                </div>
                                <div>
                                    <FieldInput
                                        type="radio"
                                        indexParent={ index }
                                        id={`musica_${index + 1}`}
                                        name={ `rol_autor_${index + 1}` }
                                        value="Música"
                                        onChange={ changes }
                                    />
                                    <label htmlFor={`musica_${index + 1}`} className="radio__label negrita-medium">Música.</label>
                                </div>
                                <div>
                                    <FieldInput
                                        type="radio"
                                        indexParent={ index }
                                        id={`letra_y_musica_${index + 1}`}
                                        name={ `rol_autor_${index + 1}` }
                                        value="Letra y Música" 
                                        onChange={ changes }
                                    />
                                    <label htmlFor={`letra_y_musica_${index + 1}`} className="radio__label negrita-medium">Letra y Música.</label>
                                </div>
                                <div>
                                    <FieldInput
                                        type="radio"
                                        indexParent={index}
                                        id={`no_sabe_${index + 1}`}
                                        name={ `rol_autor_${index + 1}` }
                                        value="no_sabe"
                                        onChange={ changes }
                                    />
                                    <label htmlFor={`no_sabe_${index + 1}`} className="radio__label negrita-medium">No se.</label>
                                </div> 

                                <button onClick={ () => onDelete( index ) } >
                                    Eliminar
                                </button>
                            </div> 
                        </div>
                    ))
                }
                 
                    <button
                        onClick={ onAdd }
                    >
                        + Agregar Compositor
                    </button>

                    <button onClick={ handleClick }>
                        Guardar
                    </button>

                
        </section>
    )
}
