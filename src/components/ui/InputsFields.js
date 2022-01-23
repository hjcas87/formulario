import React from 'react';
import { useDispatch } from 'react-redux';



export const InputsFields = React.memo(({

    label,
    type,
    name,
    value,
    id,
    index,
    onChange,
    onBlur

}) => {
// console.log('se llama el dinamico')
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
                onChange={ (e) => onChange(e, index) }
                onBlur={onBlur}
            />
        </div>
    )
})

