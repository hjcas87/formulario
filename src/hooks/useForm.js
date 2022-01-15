import { useCallback, useState } from 'react';


export const useForm = ( initialState = {} ) => {
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    }

    // const handleInputChange = useCallback(
    //     ({ target }) => {
    //         setValues( v => {
    //             return {
    //             ...v,
    //             [ target.name ]: target.value
    //         }});
    //     },
    //     [setValues]
    // )

    const handleInputChange = useCallback(
        ({ target }) => {
            setValues( v => (
                { ...v,
                [ target.name ]: target.value
                }
            ));
        },
        [setValues],
    )

    // const handleInputChange = ({ target }) => {
    //     setValues({
    //         ...values,
    //         [ target.name ]: target.value
    //     });
        

    // } 


    return [ values, handleInputChange, reset ];

}

