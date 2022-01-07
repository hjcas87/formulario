

export const getLocalStorage = ( counter ) => {
    
    console.log(counter)
    const data = JSON.parse(localStorage.getItem('basicInfo')) || {};
    const dataSong = JSON.parse(localStorage.getItem('albumFormValues')) || [[]];
    const dataUpc = JSON.parse(localStorage.getItem('upcValues')) || [] ;
    const dataAlbumsValues = JSON.parse(localStorage.getItem('albumValues')) || [];
    const dataSongValues = JSON.parse(localStorage.getItem('songsValues')) || [];
    const dataAlbumSongValues = JSON.parse(localStorage.getItem('albumAndSongsValues')) || [];


console.log(['waaaach'])

    return {
        counter,
        data,
        dataSong,
        dataUpc,
        dataAlbumsValues,
        dataSongValues,
        dataAlbumSongValues,
    }

}
