import { useState } from 'react';
import * as Styles from './styles';
import Brand from './Brand';
import Navigation from './Navigation';
import Drawer from './Drawer';

const Navbar = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <Styles.Navbar>
      <Styles.Container>
        <Brand />
        <Navigation open={() => setShowDrawer(true)} />
      </Styles.Container>
      <Drawer show={showDrawer} close={() => setShowDrawer(false)} />
    </Styles.Navbar>
  );
};

export default Navbar;
