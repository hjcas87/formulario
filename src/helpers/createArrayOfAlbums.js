


export const createArrayOfAlbums = ( cantidad ) => {
   
    let arr = [];
    // let arrValue = fields.map( f => Object.values(f)[0]);
    for (let i = 0; i < cantidad; i++) {
        const obj = {};
        // fields[i]  
            // ? obj[ `${propiedad}_${i + 1}` ] = arrValue[i]
        obj[ `Album_${i + 1}` ] = ''; // Esta propiedad puede o debe variar segun se necesite (name del input) 
        arr = [...arr, {...obj}];
    }
    // setFields([...arr]);
    return arr;

}
