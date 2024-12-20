import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary ">
        <div className="container">
          <NavLink to="/" className="text-decoration-none">
            <span className="navbar-brand mb-0 text-white fs-1">
              Pizza Turtle Admin
            </span>
          </NavLink>
          <div className="ms-auto">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item fs-4">
                <NavLink className="nav-link " to="/admin/orders">
                  Orders
                </NavLink>
              </li>
              <li className="nav-item fs-4">
                <NavLink className="nav-link" to="/admin/dishes">
                  Dishes
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
