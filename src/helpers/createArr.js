

// export const createArr = ( cantidad ) => {
//     console.log(Object.values(cantidad))
//     let arr = [];
//     Object.values(cantidad).forEach( data => {
//         data.map( d => {
//             return arr = [...arr, d]
//         })
//     })

//     console.log(arr)
//     return arr
// }

export const createNumOfAlbum = ( cantidad ) => {
    let obj = {};
    for (let i = 0; i < cantidad; i++) {
        obj[`album_${i + 1}`] = '';
    };

    return obj;
};

export const objectMap = ( objeto ) => {
    console.log(objeto)
    for (let i = 0; i < Object.keys(objeto).length; i++) {
        console.log(Object.values(objeto))
        
    }
    
};