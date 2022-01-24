

export const getLocalStorage = ( ) => {
    
    const formAlbumData = {
        artista_principal: '',
        artistas_secundarios: [],
        fecha_lanzamiento: '',
        idioma: '',
        titulo_album: '',
        UPC: '',
        solicitaUpc: '',
        albumsYCanciones: [],
        albumStarted: false
    }
    
    const formSimpleData = {
        info_basica: {
            artista_principal: '',
            artistas_secundarios: [],
            fecha_lanzamiento: '',
            idioma: '',
            titulo_album: '',
        },
        cancion: {
            artistas_destacados: [],
            composicion: '',
            compositores: [],
            idioma: '',
            lenguaje_explicito: '',
            otro_idioma: '',
            version_en_vivo: '',
        },
        generoYLocalizacion: {
            genero_1: '',
            genero_2: '',
            localizacion: '',
            artista_similar_1: '',
            artista_similar_2: '',
            artista_similar_3: '',
        },
        codigo_barra: {
            UPC: '',
            solicitaUpc: '',
        },
        ISRC: {
            codigo_ISRC: '',
            num_codigo: '',
        },
        opciones_distribucion: '',
        canciones_extendidas: {
            cancion_extendida: '',
            solo_album: ''
        },
        simpleStarted: false
    }

    const formStarted = false;
    
    // // console.log(counter)
    const started = JSON.parse(localStorage.getItem('started')) || formStarted;
    const data = JSON.parse(localStorage.getItem('albumInfo')) || formAlbumData;
    const simpleData = JSON.parse(localStorage.getItem('simpleInfo')) || formSimpleData;
    const dataSong = JSON.parse(localStorage.getItem('albumFormValues')) || [[]];
    // const dataUpc = JSON.parse(localStorage.getItem('upcValues')) || [] ;
    const dataAlbumAmount = JSON.parse(localStorage.getItem('albumAmount')) || [];
    const dataSongsAmount = JSON.parse(localStorage.getItem('songsAmount')) || [];
    const dataAlbumSongValues = JSON.parse(localStorage.getItem('albumAndSongsValues')) || [];


// // console.log(['waaaach'])

    return {
        started,
        data,
        simpleData,
        dataSong,
        // dataUpc,
        dataAlbumAmount,
        dataSongsAmount,
        dataAlbumSongValues,
    }

}
