import { useNavigate } from "react-router-dom";


import { useForm } from "../../hooks/useForm";

    

export const GendersScreen = () => {

    const navigate = useNavigate();

    const [ values, handleInputChange ] = useForm({
        genero_1: '',
        genero_2: '',
        localizacion: '',
        artista_similar_1: '',
        artista_similar_2: '',
        artista_similar_3: '',
    })

    const { genero_1, genero_2, localizacion, artista_similar_1, artista_similar_2, artista_similar_3, } = values;

    console.log(values)

    const handleClick = (e) => {
        e.preventDefault();
        navigate( '/isrc' )
    }



    return (
        <div>
            <div className="titulo__seccion">
                <h3>Género Musical</h3>
            </div>
                <p>Decinos dos generos musicales con los cuales identifiques tu musica</p>
            <div className="campo">
                <label htmlFor="genero_1" className="campo__label negrita-medium">Género Nº1</label>
                <input
                    type="text"
                    className="campo__field--generado"
                    id="genero_1"
                    name="genero_1" 
                    value={ genero_1 }
                    onChange={ handleInputChange }
                />
            </div>    
            <div className="campo">
                <label htmlFor="genero_2" className="campo__label negrita-medium">Género Nº2</label>
                <input
                    type="text"
                    className="campo__field--generado"
                    id="genero_2"
                    name="genero_2"
                    value={ genero_2 }
                    onChange={ handleInputChange }
                />
            </div>    
            <div className="titulo__seccion">
                <h3>Localización</h3>
            </div>
            <p>De donde es la banda o artista?</p>
            <div className="campo">
                <input
                    type="text"
                    className="campo__field--generado"
                    id="localizacion"
                    name="localizacion"
                    value={ localizacion }
                    onChange={ handleInputChange }
                />
            </div>
            <div className="titulo__seccion">
                <h3>Artistas Similares</h3>
            </div>
            <p>Decinos tres artistas con los cuales te identifiques</p>
            <div className="campo">
                <label htmlFor="artista_similar_1" className="campo__label negrita-medium">Artista nº1</label>
                <input
                    type="text"
                    className="campo__field--generado"
                    id="artista_similar_1"
                    name="artista_similar_1"
                    value={ artista_similar_1 }
                    onChange={ handleInputChange }
                />
            </div>
            <div className="campo">
                <label htmlFor="artista_similar_2" className="campo__label negrita-medium">Artista nº2</label>
                <input
                    type="text"
                    className="campo__field--generado"
                    id="artista_similar_2"
                    name="artista_similar_2"
                    value={ artista_similar_2 }
                    onChange={ handleInputChange }
                />
            </div>
            <div className="campo">
                <label htmlFor="artista_similar_3" className="campo__label negrita-medium">Artista nº3</label>
                <input
                    type="text"
                    className="campo__field--generado"
                    id="artista_similar_3"
                    name="artista_similar_3"
                    value={ artista_similar_3 }
                    onChange={ handleInputChange }
                />
            </div>

            <button onClick={ handleClick }>
                Continuar
            </button>
        </div>
    )
}
