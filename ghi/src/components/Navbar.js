import { NavLink } from 'react-router-dom';

function Nav() {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">thriftBay</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div>
                    <ul>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/...enter pg name">Display Page Name</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )

}

export default Nav;
