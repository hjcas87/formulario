import React from "react";



export const FieldInput = React.memo(({ indexParent, type, name, value, onChange, id, checked, className, values }) => {
 
    console.log('fock')
    return (


          <>

            <input
              name={name}
              id={id}
              className={ className }
              type={type}
              value={value}
              checked={checked}
              onChange={(event) => onChange(event, indexParent)}
            />

          </>

    ) 
});