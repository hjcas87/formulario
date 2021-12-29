

export const albumsWithSongsAndId = ( songs ) => {

    if (!songs) { return }
    
    let albumsWithSongsAndId = [];

        for (let i = 0; i < songs.length; i++) {

            let albums = [];

            for (let x = 0; x < songs[i].length; x++) {

                const obj = {};
                obj.nombre = songs[i][x][`cancion_${ x + 1 }` ]
                obj.id = `abm-${i + 1}-sng-${x + 1}`;

                albums = [...albums, obj];

            }
            albumsWithSongsAndId = [...albumsWithSongsAndId, albums];
            
        }

    return albumsWithSongsAndId;

}

