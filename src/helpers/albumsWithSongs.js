

export const albumsWithSongs = ( albums, songs, propiedad = 'cancion' ) => {
// console.log(albums)
// console.log(songs)
    let canciones = [];
    for (let i = 0; i < albums.length; i++) {
            let cancion = []
            for (let x = 0; x < albums[i].length; x++) {
                const obj = {};
                obj[ `${propiedad}_${x + 1}` ] = songs[0].value;
                cancion = [...cancion, {...obj} ]
                songs.shift();
            }
            canciones = [...canciones, cancion]  
    }
    console.log(canciones)
    return canciones;


}

