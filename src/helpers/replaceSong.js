

export const replaceSong = ( dataSong, song ) => {
    
    for (let x = 0; x < dataSong.length; x++) {
        for (let i = 0; i < dataSong[x].length; i++) {
            if (dataSong[x][i].id === song.id) {
                dataSong[x][i] = song
            } 
        }
    }
    return dataSong
}
