import { Outlet } from 'react-router-dom'
import { Sidebar } from '../album/Sidebar'

export const AlbumScreen = () => {
    return (
        <section className="grid-screen">
            <aside className="sidebar-cont bg-dark">
                <Sidebar />
            </aside>
            <Outlet />
        </section>
    )
}
