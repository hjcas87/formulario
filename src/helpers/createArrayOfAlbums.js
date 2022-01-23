


export const createArrayOfAlbums = ( cantidad, previousAlbum ) => {
   
    let arr = [];
    let arrValue = previousAlbum.map( f => Object.values(f)[0]);
    for (let i = 0; i < cantidad; i++) {
        const obj = {};
        previousAlbum[i]  
            ? obj[ `Album_${i + 1}` ] = arrValue[i]
            : obj[ `Album_${i + 1}` ] = ''; 
        arr = [...arr, {...obj}];
    }
    return arr;

}
