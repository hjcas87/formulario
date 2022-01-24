
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { infoFormAlbum } from "../../../actions/post";
import { removeError, setError } from "../../../actions/ui";
import { albumsWithSongsAndId, albumsWithSongsUpdated } from "../../../helpers/albumsWithSongsAndId";
import { getLocalStorage } from "../../../helpers/getLocalStorage";
import { HelpItem } from "../../ui/HelpItem";
import { SelectNamesOfSongs } from "./SelectNamesOfSongs";
import { SelectNumberOfAlbums } from "./SelectNumberOfAlbums";
import { SelectNumberOfSongsPerAlbum } from "./SelectNumberOfSongsPerAlbum";





export const AlbumInformation = (props) => {

    const { albumInfo} = useSelector(state => state.form)
    const { localChanges, amountObj = [] } = useSelector(state => state.ui)
    // const state = useSelector(state => state.form)

    // console.log(localChanges)
    
    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui);
    const navigate = useNavigate();
    const { dataAlbumAmount, dataSongsAmount, dataAlbumSongValues, data } = useMemo(() => getLocalStorage(localChanges), [localChanges]);
    // console.log(data.albumsYCanciones.length)
    // console.log(albumsAndSongsValues)
    // const { albumsYCanciones } = data
    // console.log(dataAlbumAmount)
    // console.log(albumInfo.albumsYCanciones)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSongTitlesValid()) {
            console.log(albumInfo.albumsYCanciones)
            const canciones = albumsWithSongsAndId( albumInfo.albumsYCanciones );
            let data = JSON.parse(localStorage.getItem('albumFormValues')) || [[]];
            const newData = albumsWithSongsUpdated( canciones, data )
            localStorage.setItem( 'albumFormValues', JSON.stringify(newData) );
            localStorage.setItem( 'albumAndSongsValues', JSON.stringify(newData) );
            albumInfo.albumsYCanciones = newData;
            dispatch( infoFormAlbum( albumInfo ) )
            const newInfo = JSON.parse(localStorage.getItem('albumInfo')) || {};
            newInfo.albumsYCanciones = albumInfo.albumsYCanciones;
            console.log(newInfo)
            localStorage.setItem( 'albumInfo', JSON.stringify(newInfo) );
            animationScreenNavigate()
        }
    }

    const animationScreenNavigate = () => {
        const screen = document.querySelector('#album-info');
        screen.classList.remove('animate__fadeInRight');
        screen.classList.add('animate__fadeOutLeft', 'animate__faster');
        screen.addEventListener('animationend', () => {
            
            navigate('/album/songs');
        
        });
    };

    const isSongTitlesValid = (e) => {

        console.log('hola')
        const inputTitlesSongs = document.querySelector('#input-titles');
        const firstInput = document.querySelector('#first-input');
        const inputsValue = firstInput.querySelector('input');
        const inputsSongs = document.querySelector('#input-songs');
        const inputsSongsVal = [...inputsSongs.querySelectorAll('input')];
        const titles = document.querySelectorAll('.title-song');
        
        const inputs = [...inputTitlesSongs.querySelectorAll('input')];
        const allInputs = [...document.querySelectorAll('input')];

        console.log(inputs.length, titles.length)
        if (Number(inputsValue.value) !== inputsSongsVal.length) {
            inputsValue.value = inputsSongsVal.length;
        }
        if ( inputs.some( ipt => ipt.value.toString().trim().length === 0 )) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            dispatch( setError('Los titulos de las canciones no pueden estar vacios') );
            return false;
        }       
        if ( inputs.length < titles.length ) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            dispatch( setError('Faltan canciones por agregar') );
            return false;
        }
        if ( allInputs.some( ipt => ipt.value.toString().trim().length === 0 )) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            dispatch( setError('Por favor completá todos los campos') );
            return false;
        }       
        dispatch( removeError() );
        return true;
    }



    return (
        <div className="main-container">
            <div className=" text-secondary py-5 text-center animate__animated animate__fadeIn" id="album-info">
                    
                <div className="py-5">
                    <div className="d-flex justify-center align-center">
                        <h1 className="text-white">Número de discos</h1>
                        <HelpItem content="?"/>
                    </div>
                    <div className="p-2">
                        <p className="text-white">¿Cuántos discos/volúmenes tiene tu álbum? (Para la mayoría de los artistas, 
                            la respuesta será uno, pero si estás lanzando un álbum doble o una caja de colección, 
                            por favor dinos cuántos discos hay en la caja).
                        </p>
                    </div>
                    <div className="col-auto">
                        <form
                            onSubmit={ handleSubmit }
                        >
                            { 
                                msgError &&
                                    (
                                        <div className="error">
                                            { msgError }
                                        </div>
                                    )
                            }

                            <SelectNumberOfAlbums local={dataAlbumAmount}/>

                            <SelectNumberOfSongsPerAlbum oneLocal={dataAlbumAmount} twoLocal={dataAlbumSongValues}/>

                            {
                                amountObj.length > 0 && 
                                <>
                                <SelectNamesOfSongs local={ data } />
                                
                                <button className="btn btn-outline-info btn-lg px-4 fw-bold mt-5">
                                    Guardar y continuar
                                </button>
                                </>
                            }
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
