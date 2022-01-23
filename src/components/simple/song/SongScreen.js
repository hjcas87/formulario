import { useNavigate } from "react-router-dom"

import { getLocalStorage } from "../../../helpers/getLocalStorage";
import { useForm } from "../../../hooks/useForm";
import { useFormDinamic } from "../../../hooks/useFormDinamic";
import { ButtonItem } from "../../ui/ButtonItem";
import { FieldInput } from "../../ui/FieldInput";
import { HelpItem } from "../../ui/HelpItem";

let arr = ['1'];
export const SongScreen = () => {
    
    const navigate = useNavigate();

    const { simpleData } = getLocalStorage();

    const { cancion, artista_principal, titulo_album, artistas_secundarios } = simpleData;

    console.log(cancion)

    const {
        artistas_destacados,
        composicion,
        compositores,
        idioma,
        lenguaje_explicito,
        otro_idioma,
        version_en_vivo,
        
    } = cancion;

    const [ composers, onAdd, onDelete, changes ] = useFormDinamic( compositores );

    const [ artistaDestacado, addArtist, deleteArtist, changesArtist ] = useFormDinamic(artistas_destacados);
    
    const [ formValues, handleInputChange ] = useForm({
        lenguaje_explicito,
        version_en_vivo,
        composicion,
        idioma,
        otro_idioma,
    });

    const handleClick = (e) => {
        e.preventDefault();
        formValues.artistas_destacados = artistaDestacado;
        formValues.compositores = [...composers];
        simpleData.cancion = formValues;
        console.log(simpleData.cancion)
        localStorage.setItem( 'simpleInfo', JSON.stringify(simpleData) );
        navigate('/simple/genders');
    }



    return (
        <div className="main-container">
            <div className="text-secondary text-align-left animate__animated animate__fadeIn">
                
            
                <div className="py-5 mt-3">
                    
                    <h1 className="text-align-left text-transform">{ titulo_album }</h1>

                    <form onSubmit={ e => e.preventDefault() }>
                    
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
                                <HelpItem content={ "?" }/>
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
                                    <option value="artista_destacado">Artista Destacado</option>
                                    <option value="productor">Productor</option>
                                    <option value="remixer">Remixer</option>
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
                                        <HelpItem content={ "?" }/>
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
                                checked={formValues.version_en_vivo === 'No'}
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
                                checked={formValues.version_en_vivo === 'Si'}
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

                {
                    composers.map( ( field, index ) => (
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
                                <div className="d-flex justify-center">
                                    <button 
                                        className="btn mb-5"
                                        onClick={ () => onDelete( index ) } 
                                    >
                                        Eliminar
                                    </button>
                                </div>
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
