import React from 'react';
import { useDispatch } from 'react-redux';



export const InputsFields = React.memo(({

    label,
    type,
    name,
    value,
    id,
    onChange

}) => {

    console.log('Se llama InputsFields')

    const dispatch = useDispatch();
    
    const dispatchBasicInfo = ({ target }) => {

    }

    return (
        <div className="input_group">
            <label htmlFor={ id } className="mb-1">{ label }</label>
            <input 
                type={ type }
                autoComplete="off"
                className="form-control"
                name={ name }
                value={ value }
                id={ id }
                onChange={ onChange }
                onBlur={ dispatchBasicInfo }
            />
        </div>
    )
})
