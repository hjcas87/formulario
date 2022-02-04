
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { removeError, removeMsg, setError, setMsg } from "../../../actions/ui";
import { albumsWithSongsUpdated } from "../../../helpers/albumsWhitSongsUpdated";
import { albumsWithSongsAndId } from "../../../helpers/albumsWithSongsAndId";
import { getLocalStorage } from "../../../helpers/getLocalStorage";
import { getMessageById } from "../../../helpers/getMessageById";
import { HelpItem } from "../../ui/HelpItem";
import { SelectNamesOfSongs } from "./SelectNamesOfSongs";
import { SelectNumberOfAlbums } from "./SelectNumberOfAlbums";
import { SelectNumberOfSongsPerAlbum } from "./SelectNumberOfSongsPerAlbum";


export const AlbumInformation = () => {
    
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { albumInfo } = useSelector(state => state.albumForm)
    
    let { amountObj = [] } = useSelector(state => state.ui)

    const { msgError, msg } = useSelector( state => state.ui);

    const { data, data: { albumValues }, dataSong } = useMemo(() => getLocalStorage(), []);

    useEffect(() => {
        albumInfo.albumValues = albumValues;
        amountObj = dataSong;
    }, [])

    useEffect(() => {
        window.scroll({ top: 0, left: 0 })
        document.querySelector('body').classList.remove('overflow');
        dispatch( removeError() );
        dispatch( removeMsg() );
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSongTitlesValid()) {
            const canciones = albumsWithSongsAndId( albumInfo.albumsYCanciones );
            const newData = albumsWithSongsUpdated( canciones, dataSong );
            data.albumsYCanciones = newData;
            data.albumValues = albumInfo.albumValues;
            localStorage.setItem( 'albumFormValues', JSON.stringify( newData ) );
            localStorage.setItem( 'albumInfo', JSON.stringify( data ) );
            animationScreenNavigate()
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

    const isSongTitlesValid = (e) => {

        // // console.log('hola')
        const inputTitlesSongs = document.querySelector('#input-titles');
        const firstInput = document.querySelector('#first-input');
        const inputsValue = firstInput.querySelector('input');
        const inputsSongs = document.querySelector('#input-songs');
        const inputsSongsVal = [...inputsSongs.querySelectorAll('input')];
        const titles = document.querySelectorAll('.title-song');
        
        const inputs = [...inputTitlesSongs.querySelectorAll('input')];
        const allInputs = [...document.querySelectorAll('input')];

        // // console.log(inputs.length, titles.length)
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
    const handleClose = () => {
        dispatch( removeMsg() );
        document.querySelector('body').classList.remove('overflow');
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


    return (
        <div className="main-container">
            <div className=" text-secondary text-center animate__animated animate__fadeIn" id="info-screen">
                    
                <div className="py-5 mt-5">
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
                        <div className="d-flex flex-column">
                            <h1 className="text-align-left mb-0">Álbum</h1>
                            <div className="d-flex align-center">
                                <h2 className="text-align-left">Número de discos</h2>
                                <HelpItem content={ "?" } onClick={() => handleClick('titulos')}/>
                            </div>
                            <hr />
                    </div>
                    <div>
                        <p className="text-align-left">¿Cuántos discos/volúmenes tiene tu álbum? (Para la mayoría de los artistas, 
                            la respuesta será uno, pero si estás lanzando un álbum doble o una caja de colección, 
                            por favor dinos cuántos discos hay en la caja).
                        </p>
                    </div>
                    <div className="mt-5">
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

                            <SelectNumberOfAlbums albumValues={albumValues}/>

                            <SelectNumberOfSongsPerAlbum albumValues={albumValues} twoLocal={dataSong}/>

                            {
                                amountObj.length > 0 && 
                                <>
                                <SelectNamesOfSongs local={ dataSong } albumValues={albumValues} />
                                <hr className="mt-5"/>
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
