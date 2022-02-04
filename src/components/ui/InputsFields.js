import React from 'react';

export const InputsFields = React.memo(({

    label,
    type,
    name,
    value,
    id,
    index,
    onChange,
    onBlur,
    checked,
    className,
    flexDirection

}) => {
    
    return (
        <div className={`d-flex g-1 align-center ${flexDirection ? flexDirection : ''}`}>
            <input 
                type={ type }
                autoComplete="off"
                className={ className }
                name={ name }
                value={ value }
                id={ id }
                checked={checked}
                onChange={ (e) => onChange(e, index) }
                onBlur={onBlur}
            />
            <label htmlFor={ id } className="mb-1">{ label }</label>
        </div>
    )
})

