import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { albumsWithSongsInfo } from "../../actions/post";
import { createInputsSongs } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";
import { useFormDinamic } from "../../hooks/useFormDinamic";
import { getSongById } from "../../selectors/getSongById";
import { FieldInput } from "../ui/FieldInput";


let arr = ['1'];
export const SongScreen = () => {

    // const [ counter, setCounter] = useState(0)
    const navigate = useNavigate();
    const basicData = JSON.parse(localStorage.getItem('basicInfo')) || {};
    const { albumsAndSongsValues } = useSelector(state => state.form);
    const data = JSON.parse(localStorage.getItem('albumFormValues')) || albumsAndSongsValues
    const { artista_principal = '', artistas_secundarios = [] } = basicData
    const { id } = useParams();
    // // console.log(post)
    const dispatch = useDispatch();
    // console.log(data)
    
    const song = getSongById( data, id ) || {};
    const {
        artistas_destacados,
        composicion,
        compositores: composers,
        id: uid,
        idioma,
        lenguaje_explicito,
        nombre,
        otro_idioma,
        version_en_vivo,
        
    } = song;
    // console.log(song.length)

    // const rol = `rol_autor_${ counter }`

    const initialValue = {
        compositor: '',
        // [rol]: ''
    }
    // initialValue[rol] = ''
    // console.log(initialValue)
    const [ compositores, onAdd, onDelete, changes ] = useFormDinamic( song.compositores );
    // console.log(song.compositores)
    const initialValues = {
        artista_destacado: '',
        rol: ''
    }
    // useEffect(() => {
    //     setCounter(counter + 1)
    // }, [compositores.length])
    const [ artistaDestacado, addArtist, deleteArtist, changesArtist ] = useFormDinamic(artistas_destacados);

    // console.log(compositores)
    const [ formValues, handleInputChange ] = useForm({
        lenguaje_explicito: song.lenguaje_explicito || '',
        version_en_vivo: song.version_en_vivo || '',
        composicion: song.composicion || '',
        idioma: song.idioma || '',
        otro_idioma: song.otro_idioma || ''
    });

    const handleClick = (e) => {
        e.preventDefault();
        song.artistas_destacados = artistaDestacado;
        song.composicion = formValues.composicion;
        song.compositores = [...compositores];
        song.id = id;
        song.idioma = formValues.idioma;
        song.lenguaje_explicito = formValues.lenguaje_explicito 
        song.nombre = song.nombre;
        song.otro_idioma = formValues.otro_idioma;
        song.version_en_vivo = formValues.version_en_vivo;
    //     // console.log(albumsAndSongsValues)
    //     // console.log(data)
    // // console.log( song )
    // // console.log( formValues )
        localStorage.setItem( 'albumFormValues', JSON.stringify(data) );
        dispatch( createInputsSongs( data ) );
        navigate('/album/songs');
    }

    if (!Object.keys(song).length) {
        return <Navigate to='/album/songs' />
    }



    return (
        <div className="main-container">
            <div className="text-secondary text-align-left animate__animated animate__fadeIn">
            
                <div className="py-5 mt-3">
                    
                    <h1 className="text-center text-transform">{ song.nombre }</h1>

                    <form onSubmit={ e => e.preventDefault() }>

                    <div className="d-flex">
                        <div className="input_group">
                            <label htmlFor="info_artista" className="mb-1 text-align-left">Información del artista</label>
                            <div className="group-input d-flex">
                                <div className="input-item-text">
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
                                <div className="add-item"
                                    onClick={ addArtist }
                                >
                                    +
                                    
                                </div>
                            </div>
                        </div>
                        <div className="help-container">
                            <div className="help-item-two">
                                ?
                            </div>
                        </div>
                    </div>



                {
                    artistas_secundarios.length > 0 && 
                        artistas_secundarios.map( (artist, i) => (
                            <div key={ i } className="mb-3 d-flex">
                                <div className="input_group text-align-left">

                                <label htmlFor="info_artista" className="mb-1">Artista secundario</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    autoComplete="off"
                                    defaultValue={ artist.artista_secundario }
                                    name="artista_secundario"
                                    readOnly
                                />
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
                                    <option value="artista_destacado">Artista Destacado</option>
                                    <option value="productor">Productor</option>
                                    <option value="remixer">Remixer</option>
                                </select>
                                <div className="group-input d-flex">
                                    <div className="input-item-text">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="artista_destacado"
                                            value={ artist.artista_destacado || ''}
                                            onChange={(e) => changesArtist(e, index)}
                                        />
                                    </div>
                                    <div className="add-item"
                                            onClick={() => deleteArtist(index)}
                                        >
                                            -
                                    </div>
                                    
                                    <div className="help-container" id="help">
                                        <div className="help-item">
                                            ?
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

                <h2>Detalles de la canción</h2>

                <div className="d-flex align-center">
                    <p className="text-white">1-¿Esta canción contiene lenguaje explícito?</p>
                    <div className="help-container">
                        <div className="help-item">
                            ?
                        </div>
                    </div>
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
                                checked={formValues.lenguaje_explicito=== 'No'}
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
                    <div className="help-container">
                        <div className="help-item">
                            ?
                        </div>
                    </div>
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
                                    name="otro_idioma"
                                    onChange={ handleInputChange }
                                />

                            </div>

                    }
                </div>

                <div className="d-flex align-center">
                    <p className="text-white">3-¿Esta version esta grabada en vivo?</p>
                    <div className="help-container">
                        <div className="help-item">
                            ?
                        </div>
                    </div>
                </div>
                
                <div className="d-flex justify-left">
                    <div>
                        <div className="d-flex align-center g-1">
                            <input
                                type="radio"
                                className="radio__field"
                                id="no_vivo"
                                name="version_en_vivo"
                                value="No"
                                checked={formValues.version_en_vivo=== 'No'}
                                onChange={ handleInputChange }
                            />
                            <label htmlFor="no_vivo" className="radio__label">No</label>

                        </div>
                        <div className="d-flex align-center g-1">
                            <input
                                type="radio"
                                className="radio__field"
                                id="en_vivo"
                                name="version_en_vivo"
                                value="Si"
                                checked={formValues.version_en_vivo=== 'Si'}
                                onChange={ handleInputChange }
                            />
                            <label htmlFor="en_vivo" className="radio__label">Si</label>

                        </div>
                    </div>
                </div>   
                
                <div className="d-flex align-center">
                    <p className="text-white">4-Tipo de composición</p>
                    <div className="help-container">
                        <div className="help-item">
                            ?
                        </div>
                    </div>
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
                                checked={formValues.composicion=== 'original'}
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
                                checked={formValues.composicion=== 'cover'}
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
                                checked={formValues.composicion=== 'dominio_publico'}
                                onChange={ handleInputChange }
                            />
                            <label htmlFor="dominio" className="radio__label">Dominio Público</label>
                        </div>
                    </div>
                </div>

                {
                    compositores.map( ( field, index ) => (
                        // // console.log(field.rol_autor_1)
                        <div key={ index } className="m-auto">
                            <p>Nombre del compositor de esta canción.</p>
                            <FieldInput
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
                                            <FieldInput
                                                type="radio"
                                                indexParent={ index }
                                                id={`letra_${index + 1}`}
                                                name={ `rol_autor_${index + 1}` }
                                                checked={ field[`rol_autor_${index + 1}`] === 'Letra'}
                                                value="Letra"
                                                onChange={ (e) => changes(e, index) }
                                            />
                                            <label htmlFor={`letra_${index + 1}`} className="radio__label negrita-medium">Letra.</label>
                                        </div>
                                        <div className="d-flex align-center g-1">
                                            <FieldInput
                                                type="radio"
                                                indexParent={ index }
                                                id={`musica_${index + 1}`}
                                                name={ `rol_autor_${index + 1}` }
                                                checked={ field[`rol_autor_${index + 1}`] === 'Música'}
                                                value="Música"
                                                onChange={ changes }
                                            />
                                            <label htmlFor={`musica_${index + 1}`} className="radio__label negrita-medium">Música.</label>
                                        </div>
                                        <div className="d-flex align-center g-1">
                                            <FieldInput
                                                type="radio"
                                                indexParent={ index }
                                                id={`letra_y_musica_${index + 1}`}
                                                name={ `rol_autor_${index + 1}` }
                                                checked={ field[`rol_autor_${index + 1}`] === 'Letra y Música'}
                                                value="Letra y Música" 
                                                onChange={ changes }
                                            />
                                            <label htmlFor={`letra_y_musica_${index + 1}`} className="radio__label negrita-medium">Letra y Música.</label>
                                        </div>
                                        <div className="d-flex align-center g-1">
                                            <FieldInput
                                                type="radio"
                                                indexParent={index}
                                                id={`no_sabe_${index + 1}`}
                                                name={ `rol_autor_${index + 1}` }
                                                checked={ field[`rol_autor_${index + 1}`] === 'no_sabe'}
                                                value="no_sabe"
                                                onChange={ changes }
                                            />
                                            <label htmlFor={`no_sabe_${index + 1}`} className="radio__label negrita-medium">No se.</label>
                                        </div> 
                                        </div>
                                        </div>
                                        <button 
                                            className="btn mb-5"
                                            onClick={ () => onDelete( index ) } 
                                        >
                                            Eliminar
                                        </button>
                            </div> 
                        </div>
                    ))
                }
                    <div className="d-flex ">
                        <button
                            className="btn p-2 compositor"
                            onClick={ onAdd }
                        >
                            + Agregar Compositor
                        </button>
                    </div>
                    </form>
                    <div className="d-flex justify-evenly">
                        <button 
                            className="btn"
                            onClick={ () => {navigate('/album/songs')} }
                        >
                            Atras
                        </button>
                        <button 
                            className="btn"
                            onClick={ handleClick }
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
