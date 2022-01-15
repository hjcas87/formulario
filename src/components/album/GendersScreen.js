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
        navigate( '/album/isrc' )
    }



    return (
        <div className="main-container">
            <div className="text-secondary text-center animate__animated animate__fadeIn">
                <div className="mt-7">
                    <h2>Género Musical</h2>
                    <p>Decinos dos generos musicales con los cuales identifiques tu musica</p>
                    <div className="d-flex flex-column p-2">
                        <label htmlFor="genero_1" className="mb-1 mt-1">Género Nº1</label>
                        <input
                            type="text"
                            className="form-control"
                            id="genero_1"
                            name="genero_1" 
                            value={ genero_1 }
                            onChange={ handleInputChange }
                        />
                    </div>    
                    <div className="d-flex flex-column p-2">
                        <label htmlFor="genero_2" className="mb-1 mt-1">Género Nº2</label>
                        <input
                            type="text"
                            className="form-control"
                            id="genero_2"
                            name="genero_2"
                            value={ genero_2 }
                            onChange={ handleInputChange }
                        />
                    </div>    
                    
                    <h2>Localización</h2>
                        
                    <p>De donde es la banda o artista?</p>
                    <div className="d-flex flex-column p-2">
                        <input
                            type="text"
                            className="form-control"
                            id="localizacion"
                            name="localizacion"
                            value={ localizacion }
                            onChange={ handleInputChange }
                        />
                    </div>
                    
                    <h2>Artistas Similares</h2>
                        
                    <p>Decinos tres artistas con los cuales te identifiques</p>
                    <div className="d-flex flex-column p-2">
                        <label htmlFor="artista_similar_1" className="mb-1 mt-1">Artista nº1</label>
                        <input
                            type="text"
                            className="form-control"
                            id="artista_similar_1"
                            name="artista_similar_1"
                            value={ artista_similar_1 }
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div className="d-flex flex-column p-2">
                        <label htmlFor="artista_similar_2" className="mb-1 mt-1">Artista nº2</label>
                        <input
                            type="text"
                            className="form-control"
                            id="artista_similar_2"
                            name="artista_similar_2"
                            value={ artista_similar_2 }
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div className="d-flex flex-column p-2">
                        <label htmlFor="artista_similar_3" className="mb-1 mt-1">Artista nº3</label>
                        <input
                            type="text"
                            className="form-control"
                            id="artista_similar_3"
                            name="artista_similar_3"
                            value={ artista_similar_3 }
                            onChange={ handleInputChange }
                        />
                    </div>

                    <button 
                        className="btn mt-5 mb-5"
                        onClick={ handleClick }
                    >
                        Continuar
                    </button>
                </div>
            </div>

        </div>
    )
}
