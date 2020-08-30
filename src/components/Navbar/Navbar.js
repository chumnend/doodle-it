import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

function Navbar({ appProps }) {
  const [menuShowing, setMenu] = React.useState(false);

  return (
    <nav className="Navbar">
      <div className="Navbar-inner container">
        <Link className="Navbar-logo" to="/">
          Doodle It
        </Link>

        <div className="Navbar-links">
          {!appProps.loggedIn ? (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          ) : (
            <div>
              <Link to="/editor">Create</Link>
            </div>
          )}
        </div>

        <button
          className="Navbar-menu-icon"
          onClick={() => setMenu(!menuShowing)}
        >
          <i className="material-icons">menu</i>
        </button>

        <div className={menuShowing ? 'Navbar-menu showing' : 'Navbar-menu'}>
          {!appProps.loggedIn ? (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          ) : (
            <div>
              <Link to="/editor">Create</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
