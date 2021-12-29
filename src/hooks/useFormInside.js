import { useState } from "react";

export const useFormInside = (initialValue = {}) => {
    
    const [fields, setFields] = useState( initialValue );

    const handleInputChangess = ( valores, { target } , index, x ) => {
        const newData = valores.map((element, i) => {
            if ( i === x ) {
                    
                const data = element.map((f, j) => {
                    if ( index === j ) {
                        f[target.name] = target.value;
                    }
                    return f;
                })
                return data
            }
            return element
        });
        setFields([...newData])
    };

    return [
        fields,
        handleInputChangess
    ];
}
