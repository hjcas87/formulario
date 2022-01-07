import { NavLink } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-1 border-light border-bottom position-fixed w-100 navegacion">
        <div className="container-sm">
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
        </nav>
        // <div>
        //     <nav>
        //         <Link to="album">Álbum</Link> 
        //         <Link to="simple">Simple</Link>
        //     </nav>
            
        // </div>
    )
}


