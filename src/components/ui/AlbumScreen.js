import { Outlet } from 'react-router-dom'
import { Sidebar } from '../album/Sidebar'

export const AlbumScreen = () => {
    return (
        <section className="grid-screen">
            <Sidebar />
            <Outlet />
        </section>
    )
}
