

export const albumsWithSongsAndId = ( songs ) => {
    console.log(songs)
    if (songs) {
        let albumsWithSongsAndId = [];
        for (let i = 0; i < songs.length; i++) {
    
            let albums = [];
    
            for (let x = 0; x < songs[i].length; x++) {
                // // console.log(songs[i][x])
    
                const obj = {};
                obj.nombre = songs[i][x][`cancion_${ x + 1 }` ] || songs[i][x].nombre;
                obj.id = `abm-${i + 1}-sng-${x + 1}`;
                obj.artistas_destacados= [];
                obj.composicion= '';
                obj.compositores= [];
                obj.idioma= '';
                obj.lenguaje_explicito= '';
                obj.otro_idioma= '';
                obj.version_en_vivo= '';
    
                albums = [...albums, obj];
    
            }
            albumsWithSongsAndId = [...albumsWithSongsAndId, albums];
            
        }
    
        console.log(albumsWithSongsAndId)
        return albumsWithSongsAndId;
    }
    return;

}

export const albumsWithSongsUpdated = ( albumsAndSongsValues, data ) => {

    // // console.log(albumsAndSongsValues)
    // // console.log(data)
    let newData = [];

    for (let i = 0; i < albumsAndSongsValues.length; i++) {
        let arr = [];

        for (let x = 0; x < albumsAndSongsValues[i].length; x++) {
            if (data[i]) {
                if (data[i][x]) {
                    if (data[i][x].id === albumsAndSongsValues[i][x].id ) {
                        data[i][x].nombre = albumsAndSongsValues[i][x].nombre; 
                        arr = [...arr, data[i][x]];
                    }
    
                } else {
                    arr = [...arr, albumsAndSongsValues[i][x]];
                }
            } else {
                // console.log(albumsAndSongsValues[i])
                arr = albumsAndSongsValues[i];
            }
        }
        newData = [...newData, arr];
    }
    // console.log(newData)
    return newData
}


export const albumWithSongs = ( albumsYCanciones, albumsAndSongsValues ) => {
    console.log(albumsYCanciones)
    console.log(albumsAndSongsValues)

    let newData = [];
    let dataNew = [];
    newData = [...albumsAndSongsValues, ...albumsYCanciones];
    newData.forEach( dat => {
        if ( dat.length !== 0 ) {
            dat.map(d => dataNew = [...dataNew, d])
        }
    })        
    let newArray = [];
    let lookupObject  = {};

    for(let i in dataNew) {
        lookupObject[dataNew[i].id] = dataNew[i];
    }
    for(let i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
    let datosFinales = [];
    for (let i = 0; i < albumsAndSongsValues.length; i++) {
        let arr = [];
        for (let x = 0; x < albumsAndSongsValues[i].length; x++) {
            arr = [...arr, newArray[0]]
            newArray.shift()
        }
        datosFinales = [...datosFinales, arr]
    }
    // console.log(datosFinales)
    return datosFinales;

}

export const JustSongs = ( data = [], albumsAndSongsValues ) => {

    let newData = [];
    let dataNew = [];
    newData = [...albumsAndSongsValues, ...data];
    newData.forEach( dat => {
        if ( dat.length !== 0 ) {
            dat.map(d => dataNew = [...dataNew, d])
        }
    }) 
            
    let newArray = [];
    let lookupObject  = {};

    for(let i in dataNew) {
        lookupObject[dataNew[i].id] = dataNew[i];
    }
    for(let i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
    return newArray;
}

export const songObjet = ( canciones ) => {

    let obj = {};
    for (let i = 0; i < canciones.length; i++) {
        obj[`codigo_${i+1}`] = ''
        
    }
    return obj
}