import React from 'react'

export const newAlbumsValues = ( amount, index, local, album ) => {
    
    return album.map( (alb, i) => {
        const obj = {};
        if (amount && amount[index] && amount[index].length > 0 && amount[index][i]) {
            obj.titulo = amount[index][i].titulo;
            return obj;
        } else if (local && local.length > 0 && local[i]) {
            obj.titulo = local[i].titulo;
            return obj;
        } else {
            obj.titulo = '';
            return obj;
        }
    });
}
