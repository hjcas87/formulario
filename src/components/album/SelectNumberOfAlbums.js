import React from 'react'
import { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


import { InputNumberOfAlbums } from "../ui/InputNumberOfAlbums"
import { createArrayOfAlbums } from '../../helpers/createArrayOfAlbums'
import { formAlbumInfoAmount } from '../../actions/post'

export const SelectNumberOfAlbums = React.memo((props) => {

    console.log('SelectNumberOfAlbums')

//     const dispatch = useDispatch()
//     // const { albumsAmount } = useSelector(state => state.form)
//     // console.log(albumsAmount)
//     const [form, setForm] = useState({
//         numero_volumenes: ''
//     })
//     const { numero_volumenes } = form;

// console.log(form)
//     const handleClick = ( e ) => {
//         e.preventDefault();
//         const arr = createArrayOfAlbums( numero_volumenes );
//         dispatch( formAlbumInfoAmount( arr ) )
//     }

//     const handleInputChange = 
//     // () => {console.log('object')} 
//     useCallback(
//         ({target}) => {
//             setForm(val => {
//                 return {
//                     ...val,
//                     [ target.name ]: target.value
//                 }
//             });
//         },
//         [setForm]
//     )


    return (
        <div className="mb-3 d-flex justify-center">
            <div className="d-flex flex-column">
                <label htmlFor="nombre" className="mb-1">Número de Discos/Volúmenes</label>
                <div className="d-flex w-100 g-1 mb-1">
                    <InputNumberOfAlbums />
                <button
                    className="btn"
                    // onClick={ handleClick }
                >
                    Ok
                </button> 
                </div>
            </div>
        </div>
    )
})





















// import { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import { useForm } from "../../hooks/useForm"
// import { useFormInside } from "../../hooks/useFormInside";
// import { useDinamicForm } from "../../hooks/useDinamicForm"
// import { createInputsSongs, removeError, setError } from "../../actions/ui";

// import { albumsWithSongsAndId, albumsWithSongsUpdated } from "../../helpers/albumsWithSongsAndId";
// import { infoFormAlbumWithSongs } from "../../actions/post";
// import { getLocalStorage } from "../../helpers/getLocalStorage";

// let arr = []
// export const SelectNumberOfAlbums = () => {
    
//     const [boolean, setBoolean] = useState( false )

//     const navigate = useNavigate();
//     const dispatch = useDispatch();
    
//     const { msgError = false } = useSelector( state => state.ui);

//     const { dataAlbumsValues, dataSongValues, dataAlbumSongValues } = useMemo(() => getLocalStorage(boolean), [boolean]);

//     const { amountObj = dataAlbumSongValues } = useSelector( state => state.ui );
    
//     const [ formValues, handleInputChange ] = useForm({
//         numero_volumenes: dataAlbumsValues.length || '',
//     });
//     const { numero_volumenes: numVol } = formValues;
//     const [ campos, , , changes, createArrays, createArraysOfSongs ] = useDinamicForm( dataSongValues );
//     const [ ,changess ] = useFormInside( amountObj );
    
//     useEffect(() => {
//         dispatch( removeError() )
//     }, [])

//     useEffect(() => {
//         const arr = createArraysOfSongs(amountObj);
//         dispatch( createInputsSongs( arr ) );
        
//     }, [dataAlbumsValues]);
    

//     const handleClick = ( e ) => {
//         e.preventDefault();
//         if (isAlbumInputValid()) {
//             const arr = createArrays(numVol, 'disco');
//             localStorage.setItem( 'albumValues', JSON.stringify(arr) );
//             setBoolean( !boolean );
//         }
//     }

//     const handleSongAmount = (e) => {
//         e.preventDefault();
//         if (isSongAmountValid()) {
//             const arr = createArraysOfSongs(amountObj);
//             dispatch( createInputsSongs( arr ) );
//         }

//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if ( isSongTitlesValid(e) ) {
//             const canciones = albumsWithSongsAndId( amountObj );
//             let data = JSON.parse(localStorage.getItem('albumFormValues')) || [[]];
//             const newData = albumsWithSongsUpdated( canciones, data )
//             localStorage.setItem( 'songsValues', JSON.stringify( campos ) );
//             localStorage.setItem( 'albumFormValues', JSON.stringify(newData) );
//             localStorage.setItem( 'albumAndSongsValues', JSON.stringify(newData) );
//             dispatch( infoFormAlbumWithSongs( newData ) );
            
//             animationScreenNavigate()
            
//         }
        
//     }

//     const animationScreenNavigate = () => {
//         const screen = document.querySelector('#album-info');
//         screen.classList.remove('animate__fadeInRight');
//         screen.classList.add('animate__fadeOutLeft', 'animate__faster');
//         screen.addEventListener('animationend', () => {
            
//             navigate('/album/songs');
        
//         });
//     };
//     const isAlbumInputValid = () => {

//         if ( numVol.toString().trim().length === 0 ) {
//             dispatch( setError('Ingresa una cantidad válida del 1 al 10') );
//             return false;
//         } 
//         if (Number(numVol) <= 0 || Number(numVol) > 10) {
//             dispatch( setError('Ingresa una cantidad válida del 1 al 10') );
//             return false;
//         }
       
//         dispatch( removeError() );
//         return true;
//     }
//     const isSongAmountValid = () => {

//         const inputSongs = document.querySelector('#input-songs')
//         const inputs = [...inputSongs.querySelectorAll('input')];

//         if ( inputs.some( ipt => ipt.value.toString().trim().length === 0 )) {
//             window.scroll({
//                 top: 0,
//                 left: 0,
//                 behavior: 'smooth'
//             })
//             dispatch( setError('Ingresa una cantidad válida del 1 al 50 en todos los campos') );
//             return false;
//         } 
//         if (inputs.some( ipt => Number(ipt.value) <= 0 || Number(ipt.value) > 50 )) {
//             window.scroll({
//                 top: 0,
//                 left: 0,
//                 behavior: 'smooth'
//             })
//             dispatch( setError('Ingresa una cantidad válida del 1 al 50 en todos los campos') );
//             return false;
//         }
       
//         dispatch( removeError() );
//         return true;
//     }

//     const isSongTitlesValid = (e) => {

//         const inputTitlesSongs = document.querySelector('#input-titles');
//         const inputSongs = document.querySelector('#input-songs');
//         const inputsValue = [...inputSongs.querySelectorAll('input')];
        
//         const inputs = [...inputTitlesSongs.querySelectorAll('input')];
//         const allInputs = [...document.querySelectorAll('input')];

//         if (inputsValue.some( (ipt, i) => Number(ipt.value) !== amountObj[i].length )) {
//             handleSongAmount(e);
//             localStorage.setItem( 'songsValues', JSON.stringify( campos ) );
//             return false;
//         }
//         if ( inputs.some( ipt => ipt.value.toString().trim().length === 0 )) {
//             window.scroll({
//                 top: 0,
//                 left: 0,
//                 behavior: 'smooth'
//             })
//             dispatch( setError('Los titulos de las canciones no pueden estar vacios') );
//             return false;
//         }       
//         if ( allInputs.some( ipt => ipt.value.toString().trim().length === 0 )) {
//             window.scroll({
//                 top: 0,
//                 left: 0,
//                 behavior: 'smooth'
//             })
//             dispatch( setError('Por favor completá todos los campos') );
//             return false;
//         }       
//         dispatch( removeError() );
//         return true;
//     }

//     return (
//         <div className="main-container">
//         <div className=" text-secondary py-5 text-center animate__animated animate__fadeIn" id="album-info">
                
//             <div className="py-5">
//                 <div className="d-flex justify-center align-center">
//                     <h1 className="text-white">Número de discos</h1>
//                     <div className="help-container">
//                         <div className="help-item">
//                             ?
//                         </div>
//                     </div>
//                 </div>
//                 <div className="p-2">
//                     <p className="text-white">¿Cuántos discos/volúmenes tiene tu álbum? (Para la mayoría de los artistas, 
//                         la respuesta será uno, pero si estás lanzando un álbum doble o una caja de colección, 
//                         por favor dinos cuántos discos hay en la caja).
//                     </p>
//                 </div>
//                 <div className="col-auto">
//                 <form
//                     onSubmit={ handleSubmit }
//                 >
//                     { 
//                         msgError &&
//                             (
//                                 <div className="error">
//                                     { msgError }
//                                 </div>
//                             )
//                     }
//                     <div className="mb-3 d-flex justify-center">
//                         <div className="d-flex flex-column">
//                             <label htmlFor="nombre" className="mb-1">Número de Discos/Volúmenes</label>
//                             <div className="d-flex w-100 g-1 mb-1">
//                                 <input
//                                     type="number"
//                                     autoComplete="off"
//                                     min="1"
//                                     max="10"
//                                     className="form-control"
//                                     id="numero_discos"
//                                     value={ numVol }
//                                     name="numero_volumenes"
//                                     onChange={ handleInputChange }
//                                 />
//                             <button
//                                 className="btn"
//                                 onClick={ handleClick }
//                             >
//                                 Ok
//                             </button> 
//                             </div>
//                         </div>
//                     </div>


//                     <div id="input-songs">
//                         {
//                             // console.log(campos)
//                             campos.map( (vol, i) => ( 
//                                 <div
//                                 key={ `album ${ i }` } 
//                                 className="mb-3 d-flex justify-center mt-5 animate__animated animate__fadeInUp"
//                                 >                     
//                                 <div className="d-flex flex-column align-center">
//                                     <label htmlFor="numero_canciones" className="mb-3">
//                                         Número de canciones para el disco { i + 1 }
//                                     </label>
//                                     <div className="d-flex w-10 g-1 mb-1 min-h-4">
//                                         <input
//                                             type="number"
//                                             autoComplete="off"
//                                             min="1"
//                                             max="50"
//                                             className="form-control"
//                                             name={`disco_${i + 1}`}
//                                             value={ vol[`disco_${i + 1}`] || ''}
//                                             onChange={ (e) => changes(e, i) }
//                                         />
//                                     </div> 
//                                 </div>
//                             </div>
//                             ))
//                         }
//                         {
//                             campos.length !== 0 &&
//                             <button
//                                 className="btn"
//                                 onClick={ handleSongAmount }
//                             >
//                                 Ok
//                             </button>
//                         }
//                     </div>
//                     <div id="input-titles" className="mt-5">
//                     {
//                         amountObj.map(( f, i ) => (
//                             <div 
//                                 key={ i }
//                                 className="animate__animated animate__fadeInUp"
//                             >
//                                 <h2 className="text-white">Titulos de las canciones del disco {i + 1}</h2>
//                                 {
                                    
//                                     amountObj[i].length === 0 ?

//                                         <label htmlFor="numero_canciones">
//                                             Aún no has agregado canciones para este volumén
//                                         </label> 
//                                     :
//                                     amountObj[i].map( (j, x) => (

//                                             <div key={ f + x }
//                                                 className="mb-3"
//                                             >
//                                                 <div className="d-flex justify-center align-center g-1">
//                                                     <label htmlFor="nombre" className="form-label fs-2 col-auto text-white">{ x + 1} -</label>
//                                                     <div className="flex-fill">
//                                                         <input
//                                                             type="text"
//                                                             autoComplete="off"    
//                                                             className="form-control min-h-4 animate__animated animate__fadeInUp"
//                                                             name={ Object.keys( j )[0] }
//                                                             value={ Object.values( j )[0] }
//                                                             onChange={ (e) => changess( amountObj, e, x, i) }
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                     ))
//                                 }
//                             </div>  
//                         ))
//                     }

//                     </div>
//                     <button className="btn btn-outline-info btn-lg px-4 fw-bold mt-5">
//                         Guardar y continuar
//                     </button>

//                 </form>
//             </div>
//         </div>
//     </div>
//         </div>
//     )
// }

