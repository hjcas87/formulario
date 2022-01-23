import { useState } from "react";



export const useFormDinamic = ( initialValue = {} ) => {
    
    
    const [data, setData] = useState(initialValue);
    // // console.log(data)

    // Utilizamos el index del grupo de campos para eliminar ese grupo de la lista
    const onDelete = (indexToDelete) => {
        const newFields = data.filter((d, index) => index !== indexToDelete);
        setData([...newFields]);
    };

    // Agregamos el nuevo grupo de campos al final de la lista
    const onAdd = () => {
        setData([...data, { ...initialValue }]);
        // // console.log(data)
    };

    const add = ( arr ) => {
        // console.log(arr)
        for (let i = 0; i < arr.length; i++) {
            setData([...data, { ...initialValue }]);  
            // // console.log(data)
        }
    }

    // Utilizamos el index del grupo de campos para buscar ese grupo
    // y editar el campo correspondiente
    const onChange = (event, indexParent) => {
        // // console.log(data)
        // // console.log(indexParent)
        const newData = data.map((d, index) => {
        if (index === indexParent) {
            d[event.target.name] = event.target.value;
        }

        return d;
        });

        setData([...newData]);
    };

    return [
        data,
        onAdd,
        onDelete,
        onChange,
        add
    ]

}
