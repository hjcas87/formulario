import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom'
import { changeResume } from '../../actions/ui';
import { Navbar } from './Navbar';
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

    const simpleRoutes = [];

    const ruteAlbum = useMemo(() => pathname.includes('album'), [pathname]);
    const ruteResume = useMemo(() => pathname.includes('resume'), [pathname]);

    return (
        <>
            {/* <Navbar /> */}
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
                {/* <Outlet /> */}
        </>
    )
}
