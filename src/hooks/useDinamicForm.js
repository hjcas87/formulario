import { useState } from 'react';


export const useDinamicForm = ( initialValue = {} ) => {
    
    const [fields, setFields] = useState( initialValue );

    const handleInputChanges = ( { target } , index ) => {
        const newData = fields.map(( field, i ) => {
            if (index === i) {
                field[target.name] = target.value;
            }
            return field;
        });
        setFields([...newData]);
    };


    
    const addInputField = ( propiedad ) => {
        const obj = {};
        obj[ propiedad ] = ''; // Esta propiedad puede o debe variar segun se necesite (name del input) 
        setFields( [...fields, {...obj}] );

    };



    const deleteInputFields = ( i ) => {
        const data = fields.filter( (f, index) => i !== index);
        setFields( [...data] );
    };


    const createArray = (cantidad, propiedad) => {
        let arr = [];
        let arrValue = fields.map( f => Object.values(f)[0]);
        for (let i = 0; i < cantidad; i++) {
            const obj = {};
            fields[i]  
                ? obj[ `${propiedad}_${i + 1}` ] = arrValue[i]
                : obj[ `${propiedad}_${i + 1}` ] = '1'; // Esta propiedad puede o debe variar segun se necesite (name del input) 
            arr = [...arr, {...obj}];
        }
        setFields([...arr]);
        return arr
    } 


    const createArraysOfSongs = ( amountObj, propiedad = 'cancion') => {
        let canciones = [];
        for (let i = 0; i < fields.length; i++) {
            let cancion = []
            for (let x = 0; x < Object.values(fields[i])[0]; x++) {
                const obj = {};
                if (amountObj[i] && amountObj[i][x]) {
                    if (Object.values(amountObj[i][x]) !== '' && Object.values(amountObj[i][x]) !== []) {
                        obj[ `${propiedad}_${x + 1}` ] = Object.values(amountObj[i][x])[0];
                    }
                } else {
                    obj[ `${propiedad}_${x + 1}` ] = '';
                }
                cancion = [...cancion, {...obj} ];
            }

            canciones = [...canciones, cancion];
            
        }

        return canciones;
        
    }
    



    return [
        fields,
        addInputField,
        deleteInputFields,
        handleInputChanges,
        createArray,
        createArraysOfSongs,
    ];

}