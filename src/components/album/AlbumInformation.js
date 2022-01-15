
import { useSelector } from "react-redux";
import { SelectNumberOfAlbums } from "./SelectNumberOfAlbums";
import { SelectNumberOfSongsPerAlbum } from "./SelectNumberOfSongsPerAlbum";





export const AlbumInformation = (props) => {

    // const state = useSelector(state => state)

    // console.log(albumsAmount)
    console.log('AlbumInformation')
    // console.log(state)

    return (
        <div className="main-container">
            <div className=" text-secondary py-5 text-center animate__animated animate__fadeIn" id="album-info">
                    
                <div className="py-5">
                    <div className="d-flex justify-center align-center">
                        <h1 className="text-white">Número de discos</h1>
                        <div className="help-container">
                            <div className="help-item">
                                ?
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <p className="text-white">¿Cuántos discos/volúmenes tiene tu álbum? (Para la mayoría de los artistas, 
                            la respuesta será uno, pero si estás lanzando un álbum doble o una caja de colección, 
                            por favor dinos cuántos discos hay en la caja).
                        </p>
                    </div>
                    <div className="col-auto">
                        <form
                            onSubmit={ (e) => e.preventDefault() }
                        >
                            { 
                                // msgError &&
                                //     (
                                //         <div className="error">
                                //             { msgError }
                                //         </div>
                                //     )
                            }

                            <SelectNumberOfAlbums props={props}/>

                            <SelectNumberOfSongsPerAlbum props={props}/>

                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
