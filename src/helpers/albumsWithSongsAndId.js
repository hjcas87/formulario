

export const albumsWithSongsAndId = ( songs ) => {
    
    if (songs) {
        let albumsWithSongsAndId = [];
        for (let i = 0; i < songs.length; i++) {
    
            let albums = [];
    
            for (let x = 0; x < songs[i].length; x++) {
                // console.log(songs[i][x])
    
                const obj = {};
                obj.nombre = songs[i][x][`cancion_${ x + 1 }` ];
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
    
        return albumsWithSongsAndId;
        
    }
    return;

}

export const albumsWithSongsUpdated = ( postSongs, data ) => {

    // console.log(postSongs)
    // console.log(data)
    let newData = [];

    for (let i = 0; i < postSongs.length; i++) {
        let arr = [];

        for (let x = 0; x < postSongs[i].length; x++) {
            if (data[i]) {
                if (data[i][x]) {
                    if (data[i][x].id === postSongs[i][x].id ) {
                        data[i][x].nombre = postSongs[i][x].nombre; 
                        arr = [...arr, data[i][x]];
                    }
    
                } else {
                    arr = [...arr, postSongs[i][x]];
                }
            } else {
                console.log(postSongs[i])
                arr = postSongs[i];
            }
        }
        newData = [...newData, arr];
    }
    console.log(newData)
    return newData
}


export const albumWithSongs = ( data, postSongs ) => {
    

    let newData = [];
    let dataNew = [];
    newData = [...postSongs, ...data];
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
    for (let i = 0; i < postSongs.length; i++) {
        let arr = [];
        for (let x = 0; x < postSongs[i].length; x++) {
            arr = [...arr, newArray[0]]
            newArray.shift()
        }
        datosFinales = [...datosFinales, arr]
    }
    console.log(datosFinales)
    return datosFinales;

}

export const JustSongs = ( data = [], postSongs ) => {

    let newData = [];
    let dataNew = [];
    newData = [...postSongs, ...data];
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