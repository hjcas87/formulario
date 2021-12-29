



export const getSongById = ( postSongs, id = '' ) => {

   if (!postSongs) { return }
   let songs = []
    postSongs.forEach( album => {

        album.find( song => {
            if (song.id === id) {
                songs = song 
            }
        })
        
    });
    
    return songs
     
}