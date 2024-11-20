import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container">
                    <NavLink to="/" className="text-decoration-none">
            <span className="navbar-brand mb-0 text-white fs-1">
              Calorie Tracker
            </span>
                    </NavLink>
                    <div className="ms-auto">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/add">
                                    Meal Form
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
