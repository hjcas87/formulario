import { Link, NavLink, Outlet } from "react-router-dom";

export const Navbar = () => {
    console.log(['object'])
    return (
    <>
        <nav className="navegacion">
        <div className="navbar-container">
            <Link to="/" >B D N</Link>
            <div className="menu-links">
                <NavLink 
                    className={ ({ isActive }) => 'nav-item nav-link fs-5 ' + (isActive ? 'active' : '') } 
                    to="album"
                >
                    Álbum
                </NavLink>
                <NavLink 
                    className={ ({ isActive }) => 'nav-item nav-link fs-5 ' + (isActive ? 'active' : '') } 
                    to="simple"
                >
                    Simple
                </NavLink>
            </div>
        </div>
        </nav>
        {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-1 border-light border-bottom position-fixed w-100 navegacion">
        <div className="navbar-container">
            <a className="navbar-brand fs-1" href="#">B D N</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav w-100 d-flex justify-content-end">
            <NavLink 
                className={ ({ isActive }) => 'nav-item nav-link fs-5 ' + (isActive ? 'active' : '') } 
                to="album"
            >
                Álbum
            </NavLink>
            <NavLink 
                className={ ({ isActive }) => 'nav-item nav-link fs-5 ' + (isActive ? 'active' : '') } 
                to="simple"
            >
                Simple
            </NavLink>
            </div>
            </div>
        </div>
        </nav> */}
    </>
    )
}


