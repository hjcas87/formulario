

export const albumsWithSongsAndId = ( songs ) => {
    if (songs) {
        let albumsWithSongsAndId = [];
        for (let i = 0; i < songs.length; i++) {
            let albums = [];
            for (let x = 0; x < songs[i].length; x++) {
                const obj = {};
                obj.titulo = songs[i][x].titulo;
                obj.id = `abm-${i + 1}-sng-${x + 1}`;
                obj.artistas_destacados = [];
                obj.composicion = '';
                obj.compositores = [];
                obj.idioma = '';
                obj.lenguaje_explicito = '';
                obj.otro_idioma = '';
                obj.version = '';
    
                albums = [...albums, obj];
            }
            albumsWithSongsAndId = [...albumsWithSongsAndId, albums];
        }
        return albumsWithSongsAndId;
    }
    return;

}



// export const albumWithSongs = ( albumsYCanciones, albumsAndSongsValues ) => {

//     let newData = [];
//     let dataNew = [];
//     newData = [...albumsAndSongsValues, ...albumsYCanciones];
//     newData.forEach( dat => {
//         if ( dat.length !== 0 ) {
//             dat.map(d => dataNew = [...dataNew, d])
//         }
//     })        
//     let newArray = [];
//     let lookupObject  = {};

//     for(let i in dataNew) {
//         lookupObject[dataNew[i].id] = dataNew[i];
//     }
//     for(let i in lookupObject) {
//         newArray.push(lookupObject[i]);
//     }
//     let datosFinales = [];
//     for (let i = 0; i < albumsAndSongsValues.length; i++) {
//         let arr = [];
//         for (let x = 0; x < albumsAndSongsValues[i].length; x++) {
//             arr = [...arr, newArray[0]]
//             newArray.shift()
//         }
//         datosFinales = [...datosFinales, arr]
//     }
//     return datosFinales;

// }

// export const JustSongs = ( data = [], albumsAndSongsValues ) => {

//     let newData = [];
//     let dataNew = [];
//     newData = [...albumsAndSongsValues, ...data];
//     newData.forEach( dat => {
//         if ( dat.length !== 0 ) {
//             dat.map(d => dataNew = [...dataNew, d])
//         }
//     }) 
            
//     let newArray = [];
//     let lookupObject  = {};

//     for(let i in dataNew) {
//         lookupObject[dataNew[i].id] = dataNew[i];
//     }
//     for(let i in lookupObject) {
//         newArray.push(lookupObject[i]);
//     }
//     return newArray;
// }

// export const songObject = ( canciones, prevCodes ) => {

//     let formValues = [];

//     canciones.forEach( album => {
//         if (album.length) {
//             album.forEach( song => {
//                 formValues = [...formValues, {[song.titulo]: ''}];
//             }) 
//         } else {
//             formValues = [...formValues, {[album.titulo]: ''}];
//         }
//     })
//     formValues.map( (song, i) => {
//         if (prevCodes[i]) {
//             if (Object.keys(song)[0] === Object.keys(prevCodes[i])[0]) {
//                 return song[Object.keys(song)[0]] = Object.values(prevCodes[i])[0];
//             }
//         }
//         return
//     })

//     return formValues
// }