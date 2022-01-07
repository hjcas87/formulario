

export const getLocalStorage = ( counter ) => {
    
    console.log(counter)
    const data = JSON.parse(localStorage.getItem('basicInfo')) || {};
    const dataSong = JSON.parse(localStorage.getItem('albumFormValues')) || [[]];
    const dataUpc = JSON.parse(localStorage.getItem('upcValues')) || [] ;
console.log(['waaaach'])

    return {
        counter,
        data,
        dataSong,
        dataUpc
    }

}
