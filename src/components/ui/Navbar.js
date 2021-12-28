import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        
        <div>
            <nav>
                <Link to="album">Álbum</Link> 
                <Link to="simple">Simple</Link>
            </nav>
            
        </div>
    )
}


