
export const albumsWithSongsUpdated = ( albumsAndSongsValues, data ) => {

    let newData = [];

    for (let i = 0; i < albumsAndSongsValues.length; i++) {
        let arr = [];

        for (let x = 0; x < albumsAndSongsValues[i].length; x++) {
            if (data[i]) {
                if (data[i][x]) {
                    if (data[i][x].id === albumsAndSongsValues[i][x].id ) {
                        data[i][x].titulo = albumsAndSongsValues[i][x].titulo; 
                        arr = [...arr, data[i][x]];
                    }
    
                } else {
                    arr = [...arr, albumsAndSongsValues[i][x]];
                }
            } else {
                arr = albumsAndSongsValues[i];
            }
        }
        newData = [...newData, arr];
    }
    return newData
}