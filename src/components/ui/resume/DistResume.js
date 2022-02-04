import React from 'react'

export const DistResume = ({ data: { opciones_distribucion } }) => {
    return (
        <div>
            <h3>Opciones distribución digital:</h3>
            <p className="text-white">{ opciones_distribucion }</p>
        </div>
    )
}
