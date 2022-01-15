import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '../album/Sidebar'

export const AlbumScreen = () => {

    const {pathname} = useLocation();
    
    const albumRoutes = [
        ['/album/', 'Información básica'],
        ['/album/upc', 'Código de barras/Upc'],
        ['/album/selection', 'Información del álbum'],
        ['/album/songs', 'Canciones'],
        ['/album/genders', 'Géneros/Localización'],
        ['/album/isrc', 'Códigos ISRC'],
        ['/album/distribution', 'Distribución'],
        ['/album/artist', 'Perfil de artista'],
        ['/album/extended-songs', 'Canciones extendidas'],
    ];

    const simpleRoutes = [];

    return (
        <section className="grid-screen">
            <aside className="sidebar-cont">
                <Sidebar 
                    actualRoute={ pathname }
                    albumRoutes={ albumRoutes }
                    simpleRoutes={ simpleRoutes }
                />
            </aside>
            <Outlet />
        </section>
    )
}
