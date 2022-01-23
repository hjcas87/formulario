



export const getSongById = ( albumsAndSongsValues, id = '' ) => {

   if (!albumsAndSongsValues) { return }
   let songs = []
    albumsAndSongsValues.forEach( album => {

        album.find( song => {
            if (song.id === id) {
                songs = song 
            }
        })
        
    });
    
    return songs
     
}