import React from 'react';
import { Link, withRouter, useLocation } from 'react-router-dom';
import { Auth } from '../../services';
import './Navbar.scss';

function Navbar({ appProps, history }) {
  const [showMenu, setMenu] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenu(!showMenu);
  };

  const handleLogout = () => {
    Auth.logout();
    appProps.hasLoggedIn(false);
    appProps.setUser({});
    history.push('/');
    setMenu(false);
  };

  return (
    <nav className="Navbar">
      <div className="Navbar-inner container">
        <Link className="Navbar-logo" onClick={() => setMenu(false)} to="/">
          DoodleIt
        </Link>

        <div className="Navbar-links">
          {!appProps.loggedIn ? (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          ) : (
            <div>
              {location.pathname === '/editor' && (
                <Link to="/">Back to Console</Link>
              )}
              {location.pathname === '/' && (
                <Link to="/editor">New Doodle</Link>
              )}
              <button className="Navbar-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>

        <button className="Navbar-menu-icon" onClick={() => setMenu(!showMenu)}>
          <i className="material-icons">menu</i>
        </button>

        <div className={showMenu ? 'Navbar-menu showing' : 'Navbar-menu'}>
          {!appProps.loggedIn ? (
            <div>
              <Link to="/login" onClick={toggleMenu}>
                Login
              </Link>
              <Link to="/register" onClick={toggleMenu}>
                Register
              </Link>
            </div>
          ) : (
            <div>
              {location.pathname === '/editor' && (
                <Link to="/" onClick={toggleMenu}>
                  Back to Console
                </Link>
              )}
              {location.pathname === '/' && (
                <Link to="/editor" onClick={toggleMenu}>
                  New Doodle
                </Link>
              )}
              <button className="Navbar-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);
