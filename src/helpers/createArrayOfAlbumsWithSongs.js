

// export const createArrayOfAlbumsWithSongs = ( albumValues, prevAlbumValues ) => {
//     let canciones = [];
//     console.log(albumValues, prevAlbumValues)
//     if (albumValues) {
//         for (let i = 0; i < albumValues.length; i++) {
//             let cancion = []
//             for (let x = 0; x < Object.values(albumValues[i])[0]; x++) {
//                 const obj = {};
//                 if ( prevAlbumValues ) {
//                     if (prevAlbumValues[i] && prevAlbumValues[i][x]) {
//                         if (Object.values(prevAlbumValues[i][x]) !== '' && Object.values(prevAlbumValues[i][x]) !== []) {
//                             obj[ `cancion_${x + 1}` ] = Object.values(prevAlbumValues[i][x])[0];
//                         }
//                     }else {
//                         obj[ `cancion_${x + 1}` ] = '';
//                     }
//                 } else {
//                     obj[ `cancion_${x + 1}` ] = '';
//                 }
//                 cancion = [...cancion, {...obj} ];
//             }
    
//             canciones = [...canciones, cancion];
            
//         } 
//         console.log(canciones)
//         return canciones;
//     }
//     return

    
// }

export const createArray = (cantidad, prevAlbumValues) => {
    let arr = [];
    let arrValue = prevAlbumValues.map( f => Object.values(f)[0]);
    for (let i = 0; i < cantidad; i++) {
        const obj = {};
        prevAlbumValues[i]  
            ? obj[ `disco_${i + 1}` ] = arrValue[i]
            : obj[ `disco_${i + 1}` ] = ''; 
        arr = [...arr, {...obj}];
    }
    arr = [...arr];
    return arr
} 


export const createArraysOfSongs = ( albumValues, amountObj ) => {
    let canciones = [];
    for (let i = 0; i < albumValues.length; i++) {
        let cancion = []
        for (let x = 0; x < Object.values(albumValues[i])[0]; x++) {
            const obj = {};
            if (amountObj[i] && amountObj[i][x]) {
                if (Object.values(amountObj[i][x]) !== '' && Object.values(amountObj[i][x]) !== []) {
                    obj[ `cancion_${x + 1}` ] = Object.values(amountObj[i][x])[0];
                }
            } else {
                obj[ `cancion_${x + 1}` ] = '';
            }
            cancion = [...cancion, {...obj} ];
        }

        canciones = [...canciones, cancion];
        
    }

    return canciones;
    
}