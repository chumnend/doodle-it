import { useState } from 'react';
import PropTypes from 'prop-types';
import * as Styles from './styles';
import NavBrand from '../NavBrand';
import NavDrawer from '../NavDrawer';
import NavLinks from '../NavLinks';

const Navbar = (props) => {
  const [showNavDrawer, setShowNavDrawer] = useState(false);

  return (
    <Styles.Navbar>
      <Styles.Container>
        <NavBrand />
        <NavLinks
          isLoggedIn={props.isLoggedIn}
          open={() => setShowNavDrawer(true)}
        />
      </Styles.Container>
      <NavDrawer
        isLoggedIn={props.isLoggedIn}
        show={showNavDrawer}
        close={() => setShowNavDrawer(false)}
      />
    </Styles.Navbar>
  );
};

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default Navbar;
