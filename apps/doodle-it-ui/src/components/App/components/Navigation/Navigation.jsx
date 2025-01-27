import { useState } from 'react';
import PropTypes from 'prop-types';

import { path } from  '../../../../helpers/constants';

import * as Styles from './styles';

const Navigation = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  }

  return (
    <Styles.Navbar>
      <Styles.Container>
        <Styles.Brand href="/">Doodle It</Styles.Brand>
        <div>
          <Styles.Menu className="material-icons" onClick={openDrawer}>
            menu
          </Styles.Menu>
          {!props.isLoggedIn && (
            <Styles.NavbarList>
              <Styles.NavbarListItem>
                <Styles.NavbarLink href={path.register}>Register</Styles.NavbarLink>
              </Styles.NavbarListItem>
              <Styles.NavbarListItem>
                <Styles.NavbarLink href={path.login}>Login</Styles.NavbarLink>
              </Styles.NavbarListItem>
            </Styles.NavbarList>
          )}
          {props.isLoggedIn && (
            <Styles.NavbarList>
              <Styles.NavbarListItem>
                <Styles.NavbarLink href={path.home}>Back to Home</Styles.NavbarLink>
              </Styles.NavbarListItem>
              <Styles.NavbarListItem>
                <Styles.NavbarLink href={path.designer_new}>
                  New Doodle
                </Styles.NavbarLink>
              </Styles.NavbarListItem>
              <Styles.NavbarListItem>
                <Styles.NavbarLink href={path.logout}>Logout</Styles.NavbarLink>
              </Styles.NavbarListItem>
            </Styles.NavbarList>
          )}
          {isDrawerOpen && (
            <Styles.Drawer>
              <Styles.CloseContainer>
                <Styles.CloseIcon className="material-icons" onClick={closeDrawer}>
                  close
                </Styles.CloseIcon>
              </Styles.CloseContainer>
              {!props.isLoggedIn && (
            <Styles.DrawerList>
              <Styles.DrawerListItem>
                <Styles.DrawerLink href={path.register} onClick={closeDrawer}>
                  Register
                </Styles.DrawerLink>
              </Styles.DrawerListItem>
              <Styles.DrawerListItem>
                <Styles.DrawerLink href={path.login} onClick={closeDrawer}>
                  Login
                </Styles.DrawerLink>
              </Styles.DrawerListItem>
            </Styles.DrawerList>
            )}
            {props.isLoggedIn && (
            <Styles.DrawerList>
              <Styles.DrawerListItem>
                <Styles.DrawerLink href={path.home} onClick={closeDrawer}>
                  Back to Home
                </Styles.DrawerLink>
              </Styles.DrawerListItem>

              <Styles.DrawerListItem>
                <Styles.DrawerLink href={path.designer_new} onClick={closeDrawer}>
                  New Doodle
                </Styles.DrawerLink>
              </Styles.DrawerListItem>
              <Styles.DrawerListItem>
                <Styles.DrawerLink href={path.logout} onClick={closeDrawer}>
                  Logout
                </Styles.DrawerLink>
              </Styles.DrawerListItem>
            </Styles.DrawerList>
            )}
            </Styles.Drawer>
          )}
        </div>
      </Styles.Container>
      {/* Drawer goes here */}
    </Styles.Navbar>
  );
};

Navigation.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default Navigation;
