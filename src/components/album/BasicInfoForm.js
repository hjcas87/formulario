

import { useDinamicForm } from "../../hooks/useDinamicForm";
import { useForm } from "../../hooks/useForm";
import { HelpItem } from "../ui/HelpItem"
import { InputsFields } from "../ui/InputsFields"


export const BasicInfoForm = ({ data }) => {

    // console.log(data)

    
    const { idioma: lang, artista_principal: artist, titulo_album: title, fecha_lanzamiento: date, artistas_secundarios} = data;

    const [ formValues, handleInputChange ] = useForm({
        idioma: lang || '',
        artista_principal: artist || '',     
        titulo_album: title || '',
        fecha_lanzamiento: date || '',
        artistas_secundarios
    });

    const [ artistasSecundarios, addInputField, deleteInputFields, changes ] = useDinamicForm( artistas_secundarios || [] )
    

    const { idioma, artista_principal, titulo_album, fecha_lanzamiento } = formValues;

    return (
        

        <form className="py-5">

            <div className="mb-3 d-flex ">
                <InputsFields
                    label="Idioma del Álbum"
                    type="text"
                    name="idioma"
                    value={ idioma }
                    id="idioma"
                    onChange={ handleInputChange }
                    // onBlurValue= 
                />
                <HelpItem content={ "?" }/>
            </div>

            <div className="mb-3 d-flex flex-column">
                <div className="d-flex">
                    <InputsFields
                        label="Nombre del Artista"
                        type="text"
                        name="artista_principal"
                        value={ artista_principal }
                        id="nombre"
                        onChange={ handleInputChange }
                        // onBlurValue= 
                    />
                    {/* <div className="input_group">
                        <label htmlFor="nombre" className="mb-1">Nombre del Artista</label>

                                <input
                                    type="text"
                                    autoComplete="off"
                                    className="form-control fs-4"
                                    name="artista_principal"
                                    value={ artista_principal }
                                    id="nombre"
                                    onChange={ handleInputChange }
                                />
                    </div> */}
                    <div className="d-flex">
                        <div className="add-item"
                            onClick={ () => addInputField( 'artista_secundario' ) }
                        >
                            +
                            
                        </div>
                        <div className="help-container">
                            <div className="help-item-two">
                                ?
                            </div>
                        </div>
                    </div>
                </div>
                {
                    artistasSecundarios.map( (field, i) => (
                        <div key={ i } className="animate__animated animate__fadeInUp">
                            <div className="d-flex">
                                <div className="group-input d-flex">
                                    <div className="input-item-text">                                                
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className="form-control"
                                            name={ Object.keys( field ) }
                                            value={ Object.values( field ) }
                                            onChange={ (e) => changes(e, i) }
                                        /> 
                                    </div>
                                    <div className="delete-item"
                                            onClick={ () => deleteInputFields(i)}
                                        >
                                        -
                                    </div>
                                </div>
                                <div className="help-container">
                                    <div className="help-item visible-hidden">
                                    </div>
                                </div> 
                            </div>                                   
                        </div>
                    ))
                }
            </div>
                
        <div className="mb-3 d-flex">
            <InputsFields 
                label="Título del Álbum"
                type="text"
                name="titulo_album"
                value={ titulo_album }
                id="titulo_album"
                onChange={ handleInputChange }
            />
        </div>

        <div className="mb-3 d-flex">
            <InputsFields 
                label="Fecha de Lanzamiento"
                type="date"
                name="fecha_lanzamiento"
                value={ fecha_lanzamiento }
                id="fecha"
                onChange={ handleInputChange }
            />
            <HelpItem content={ "?" }/>
        </div>

            
        </form>
        
    )
}
