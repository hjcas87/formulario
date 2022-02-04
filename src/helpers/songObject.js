

export const songObject = ( canciones, prevCodes ) => {

    let formValues = [];

    canciones.forEach( album => {
        if (album.length) {
            album.forEach( song => {
                formValues = [...formValues, {[song.titulo]: ''}];
            }) 
        } else {
            formValues = [...formValues, {[album.titulo]: ''}];
        }
    })
    formValues.map( (song, i) => {
        if (prevCodes[i]) {
            if (Object.keys(song)[0] === Object.keys(prevCodes[i])[0]) {
                return song[Object.keys(song)[0]] = Object.values(prevCodes[i])[0];
            }
        }
        return
    })

    return formValues
}