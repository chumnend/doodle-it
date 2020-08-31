import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Auth } from '../../services';
import './Navbar.scss';

function Navbar({ appProps, history }) {
  const [menuShowing, setMenu] = React.useState(false);

  const toggleMenu = () => {
    setMenu(!menuShowing);
  }

  const handleLogout = () => {
    Auth.logout();
    appProps.hasLoggedIn(false);
    appProps.setUser({});
    history.push('/');
    toggleMenu();
  }

  return (
    <nav className="Navbar">
      <div className="Navbar-inner container">
        <Link className="Navbar-logo" to="/">
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
              <Link to="/editor">New Doodle</Link>
              <button className="Navbar-logout" onClick={handleLogout}>Logout</button>
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
              <Link to="/login" onClick={toggleMenu}>Login</Link>
              <Link to="/register" onClick={toggleMenu}>Register</Link>
            </div>
          ) : (
            <div>
              <Link to="/editor">Create</Link>
              <button className="Navbar-logout" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);
