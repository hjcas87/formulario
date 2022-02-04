import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Sidebar } from './Sidebar';

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

    const simpleRoutes = [
        ['/simple/', 'Información básica'],
        ['/simple/upc', 'Código de barras/Upc'],
        ['/simple/songs', 'Canción'],
        ['/simple/genders', 'Géneros/Localización'],
        ['/simple/isrc', 'Códigos ISRC'],
        ['/simple/distribution', 'Distribución'],
        ['/simple/artist', 'Perfil de artista'],
        ['/simple/extended-songs', 'Canciones extendidas'],
    ];

    const ruteAlbum = useMemo(() => pathname.includes('album'), [pathname]);
    const ruteResume = useMemo(() => pathname.includes('resume'), [pathname]);

    return (
        <>
            <section className="grid-screen">
                
                <aside 
                    className={ 
                        !ruteResume ?
                            !ruteAlbum 
                                ? "sidebar-simple"
                                : "sidebar-album"
                            : "sidebar-resume"
                    }
                    id="sidebar"
                >
                    <Sidebar 
                        actualRoute={ pathname }
                        albumRoutes={ albumRoutes }
                        simpleRoutes={ simpleRoutes }
                    />
                </aside>
                <Outlet />
                
            </section>
        </>
    )
}
