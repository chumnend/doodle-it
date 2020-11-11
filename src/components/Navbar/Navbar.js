import { useState } from 'react';
import PropTypes from 'prop-types';
import * as Styles from './styles';
import Brand from './Brand';
import Navigation from './Navigation';
import Drawer from './Drawer';

const Navbar = (props) => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <Styles.Navbar>
      <Styles.Container>
        <Brand />
        <Navigation
          isLoggedIn={props.isLoggedIn}
          logout={props.logout}
          open={() => setShowDrawer(true)}
        />
      </Styles.Container>
      <Drawer
        isLoggedIn={props.isLoggedIn}
        logout={props.logout}
        show={showDrawer}
        close={() => setShowDrawer(false)}
      />
    </Styles.Navbar>
  );
};

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
  logout: PropTypes.func,
};

export default Navbar;
