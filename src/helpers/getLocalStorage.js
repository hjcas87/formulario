import { formAlbumData } from "../data/formAlbumData";
import { formSimpleData } from "../data/formSimpleData";


export const getLocalStorage = ( ) => {

    const formStarted = false;    
    const started = JSON.parse(localStorage.getItem('started')) || formStarted;
    const data = JSON.parse(localStorage.getItem('albumInfo')) || formAlbumData;
    const simpleData = JSON.parse(localStorage.getItem('simpleInfo')) || formSimpleData;
    const dataSong = JSON.parse(localStorage.getItem('albumFormValues')) || [[]];



    return {
        started,
        data,
        simpleData,
        dataSong,
    }

}
