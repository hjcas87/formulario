

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


export const createArraysOfSongs = ( albumValues, amountObj = [] ) => {

    let canciones = [];
    for (let i = 0; i < albumValues.length; i++) {
        let cancion = []
        for (let x = 0; x < Object.values(albumValues[i])[0]; x++) {
            const obj = {};
            if (amountObj[i] && amountObj[i][x]) {
                if (Object.values(amountObj[i][x]) !== '' && Object.values(amountObj[i][x]).length !== 0) {
                    obj.titulo = amountObj[i][x].titulo;
                }
            } else {
                obj.titulo = '';
            }
            cancion = [...cancion, {...obj} ];
        }
        canciones = [...canciones, cancion];
    }

    return canciones;
    
}