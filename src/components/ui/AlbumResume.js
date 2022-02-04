import React from 'react'
import { Link } from 'react-router-dom'

export const AlbumResume = React.memo(({ isStarted }) => {

    console.log(isStarted)
    return (
        <>
            <h1>chau</h1>
            <Link to={ '/album' }>IR</Link>
        </>
    )
})
