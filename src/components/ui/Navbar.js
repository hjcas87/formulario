import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { changeResume } from "../../actions/ui";
import { getLocalStorage } from "../../helpers/getLocalStorage";

export const Navbar = () => {

    const { started } = getLocalStorage();
    
    const dispatch = useDispatch()

    const {pathname} = useLocation();
    
    const ruteResume = useMemo(() => pathname.includes('resume'), [pathname]);
    const ruteHome = useMemo(() => pathname === '/', [pathname]);

    const handleClick = (e) => {
        if (e.target.classList.contains('album')) {
            dispatch( changeResume( true ) );
        } else {
            dispatch( changeResume( false ) );
        }
    }

    return (
    <>
        <nav className="navegacion bg-dark">
            <div className="navbar-container">
                <a href="https://bdn.com.ar/" className="link-item-bigger">B D N</a>

                {
                    !ruteResume && !ruteHome &&
                    <div className="menu-links">
                        <NavLink 
                            className={ ({ isActive }) => 'album link-item ' + (isActive ? 'active' : '') } 
                            to="album"
                            onClick={handleClick}
                        >
                            Álbum
                        </NavLink>
                        <NavLink 
                            className={ ({ isActive }) => 'simple link-item ' + (isActive ? 'active' : '') } 
                            to="simple"
                            onClick={handleClick}
                        >
                            Simple
                        </NavLink>
                    </div>
                }

            </div>
        </nav>
    </>
    )
}


