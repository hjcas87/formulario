import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../hooks/useForm"
import { useFormInside } from "../../hooks/useFormInside";
import { useDinamicForm } from "../../hooks/useDinamicForm"
import { createInputsSongs } from "../../actions/ui";

import { albumsWithSongsAndId, albumsWithSongsUpdated } from "../../helpers/albumsWithSongsAndId";
import { infoFormAlbumWithSongs } from "../../actions/post";

export const SelectNumberOfAlbums = () => {
    
    const data = JSON.parse(localStorage.getItem('albumValues')) || [];
    const dataSong = JSON.parse(localStorage.getItem('songsValues')) || [];
    const dataAlbumSong = JSON.parse(localStorage.getItem('album&SongsValues')) || [];

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { amountObj = dataAlbumSong } = useSelector( state => state.ui );

    const [ campos, , , changes, createArrays, createArraysOfSongs ] = useDinamicForm( dataSong );
    const [ ,changess ] = useFormInside( amountObj );
    const [ formValues, handleInputChange ] = useForm({
        numero_volumenes: data.length || '',
    });
    const { numero_volumenes: numVol } = formValues;
    
    localStorage.setItem( 'songsValues', JSON.stringify( campos ) );
    localStorage.setItem( 'album&SongsValues', JSON.stringify( amountObj ) );

    console.log(campos)
    useEffect(() => {
        
        const arr = createArraysOfSongs(amountObj);
        // console.log(arr)
        dispatch( createInputsSongs( arr ) );
        
    }, [campos]);
    

    const handleClick = ( e ) => {
        e.preventDefault();
        const arr = createArrays(numVol, 'disco');
        localStorage.setItem( 'albumValues', JSON.stringify(arr) );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const canciones = albumsWithSongsAndId( amountObj );
        // console.log(amountObj)
        // localStorage.setItem( 'album&SongsValues', JSON.stringify( amountObj ) );
        console.log(canciones)
        
        let data = JSON.parse(localStorage.getItem('albumFormValues')) || [[]];
        console.log(data)
        const newData = albumsWithSongsUpdated( canciones, data )
        localStorage.setItem( 'albumFormValues', JSON.stringify(newData) );
        dispatch( infoFormAlbumWithSongs( newData ) );
        console.log(newData)
        // localStorage.setItem( 'albumFormValues', JSON.stringify(canciones) );
        // navigate('/songs');
        
    }

    return (
        <>
        <div className=" text-secondary px-4 py-5 text-center flex-fill animate__animated animate__fadeIn">
                
            <div className="py-5">
                <h1 className="display-5 fw-bold text-white">Número de discos</h1>
                <div className="container-sm">
                    <p className="fw-ligth text-white mt-3 p-3">¿Cuántos discos/volúmenes tiene tu álbum? (Para la mayoría de los artistas, 
                        la respuesta será uno, pero si estás lanzando un álbum doble o una caja de colección, 
                        por favor dinos cuántos discos hay en la caja).
                    </p>
                </div>
                <div className="col-automx-auto">
                <form
                    onSubmit={ handleSubmit }
                >
                    <div className="mb-3 d-flex flex-column flex-sm-column mt-5">
                        <div className="row g3 row-auto d-flex justify-content-center">
                            <label htmlFor="nombre" className="form-label fs-2 row-sm-1 col-auto">Número de Discos/Volúmenes</label>
                            <div className="col-auto align-self-center">
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    className="form-control fs-4"
                                    id="numero_discos"
                                    value={ numVol }
                                    name="numero_volumenes"
                                    onChange={ handleInputChange }
                                />
                            </div>
                            <button
                                className="btn btn-outline-light col-sm-1 col-auto fs-4"
                                onClick={ handleClick }
                            >
                                Ok
                            </button> 
                        </div>
                    </div>


                    <div>
                        {
                            // console.log(campos)
                            campos.map( (vol, i) => ( 
                                <div
                                key={ `album ${ i }` } 
                                className="mb-3 d-flex flex-column flex-sm-column mt-4 animate__animated animate__fadeInUp"
                                >
                                    {console.log(vol)}                        
                                <div className="row g3 row-auto d-flex justify-content-center">
                                    <label htmlFor="numero_canciones" className="form-label fs-2 row-sm-1 col-auto">
                                        Número de canciones para el disco { i + 1 }
                                    </label>
                                    <div className="col-auto align-self-center">
                                        <input
                                            type="number"
                                            min="1"
                                            max="50"
                                            className="form-control fs-4"
                                            id="numero_canciones"
                                            name={ Object.keys( vol ) }
                                            value={ Object.values( vol ) }
                                            onChange={ (e) => changes(e, i) }
                                        />
                                    </div> 
                                </div>
                            </div>
                            ))
                        }
                        
                        <button
                            className="btn btn-outline-light col-sm-1 col-auto fs-4"
                            onClick={ handleClick }
                        >
                            Ok
                        </button>

                    </div>
                    {
                        amountObj.map(( f, i ) => (
                            <div 
                                key={ i }
                                className="animate__animated animate__fadeInUp"
                            >
                                <h2 className="display-6 fw-ligth text-white">Titulos de las canciones del disco {i + 1}</h2>
                                {
                                    amountObj[i].map( (j, x) => (
                                        <div key={ f + x }
                                            className="mb-3 d-flex flex-column flex-sm-column mt-4"
                                        >
                                            <div className="row g3 row-auto d-flex justify-content-center">
                                                <label htmlFor="nombre" className="form-label fs-2 col-auto text-white">{ x + 1} -</label>
                                                <div className="col-auto col-sm-7 align-self-center">
                                                    <input
                                                        type="text"
                                                        className="form-control fs-4 animate__animated animate__fadeInUp"
                                                        name={ Object.keys( j )[0] }
                                                        value={ Object.values( j )[0] }
                                                        onChange={ (e) => changess( amountObj, e, x, i) }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>  
                        ))
                    }

                    <hr />
                    <button className="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">
                        Guardar y continuar
                    </button>

                </form>
            </div>
        </div>
    </div>
           <div className="fill"></div> 
        </>
    )
}
