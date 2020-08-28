import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

function Navbar({ appProps }) {
  const [menuShowing, setMenu] = React.useState(false);

  return (
    <nav className="Navbar">
      <div className="Navbar-inner container">
        <Link className="Navbar-logo" to="/">Doodle It</Link>

        <div className="Navbar-links">
          {!appProps.loggedIn 
            ? <Link to="/auth">Log In/Register</Link>
            : <Link to="/editor">Create</Link>
          }
        </div>

        <button className="Navbar-menu-icon" onClick={() => setMenu(!menuShowing)}>
          <i className="material-icons">menu</i>
        </button>

        <div className={menuShowing ? 'Navbar-menu showing' : 'Navbar-menu'}>
          {!appProps.loggedIn 
            ? <Link to="/auth">Log In/Register</Link>
            : <Link to="/editor">Create</Link>
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
