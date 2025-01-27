import { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes }  from 'styled-components';

import { path } from  '../../../helpers/constants';
import { color, device, layout } from '../../../helpers/themes';

export const StyledNavbar = styled.div`
  width: 100%;
  height: ${layout.navHeight};
  background: ${color.ebony};
  position: relative;
  z-index: 1;
`;

export const StyledContainer = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledBrand = styled.a`
  font-family: 'Lily Script One', cursive;
  font-size: 2rem;
  color: ${color.white};
  text-decoration: none;
`;

export const StyledMenu = styled.span`
  font-size: 2rem;
  cursor: pointer;
  color: ${color.white};

  @media all and (min-width: ${device.md}) {
    display: none;
  }
`;

export const StyledNavbarList = styled.ul`
  list-style: none;
  display: none;

  @media all and (min-width: ${device.md}) {
    display: flex;
  }
`;

export const StyledNavbarListItem = styled.li`
  display: inline-block;
  padding: 0.5rem;
`;

export const StyledNavbarLink = styled.a`
  text-decoration: none;
  background: inherit;
  color: ${color.white};
  font-size: 1.3rem;
  &:hover {
    color: ${color.blue};
  }
`;

const drawerOpenAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`

export const StyledDrawer = styled.div`
  width: 100%;
  height: 100vh;
  background: ${color.ebony};
  color: ${color.white};
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  transition: width 0.35s ease-out;
  display: flex;
  flex-flow: column;
  animation: ${drawerOpenAnimation} 0.35s ease-out;

  @media all and (min-width: ${device.md}) {
    display: none;
  }
`;

export const StyledCloseContainer = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: row-reverse;
`;

export const StyledCloseIcon = styled.span`
  font-size: 2rem;
  cursor: pointer;
`;

export const StyledDrawerList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

export const StyledDrawerListItem = styled.li`
  display: inline-block;
  padding: 1rem;
`;

export const StyledDrawerLink = styled.a`
  text-decoration: none;
  background: inherit;
  color: inherit;
  font-size: 1.3rem;

  &:hover {
    color: ${color.blue};
  }
`;

const Navigation = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  }

  return (
    <StyledNavbar>
      <StyledContainer>
        <StyledBrand href="/">Doodle It</StyledBrand>
        <div>
          <StyledMenu className="material-icons" onClick={openDrawer}>
            menu
          </StyledMenu>
          {!props.isLoggedIn && (
            <StyledNavbarList>
              <StyledNavbarListItem>
                <StyledNavbarLink href={path.register}>Register</StyledNavbarLink>
              </StyledNavbarListItem>
              <StyledNavbarListItem>
                <StyledNavbarLink href={path.login}>Login</StyledNavbarLink>
              </StyledNavbarListItem>
            </StyledNavbarList>
          )}
          {props.isLoggedIn && (
            <StyledNavbarList>
              <StyledNavbarListItem>
                <StyledNavbarLink href={path.home}>Back to Home</StyledNavbarLink>
              </StyledNavbarListItem>
              <StyledNavbarListItem>
                <StyledNavbarLink href={path.designer_new}>
                  New Doodle
                </StyledNavbarLink>
              </StyledNavbarListItem>
              <StyledNavbarListItem>
                <StyledNavbarLink href={path.logout}>Logout</StyledNavbarLink>
              </StyledNavbarListItem>
            </StyledNavbarList>
          )}
          {isDrawerOpen && (
            <StyledDrawer>
              <StyledCloseContainer>
                <StyledCloseIcon className="material-icons" onClick={closeDrawer}>
                  close
                </StyledCloseIcon>
              </StyledCloseContainer>
              {!props.isLoggedIn && (
            <StyledDrawerList>
              <StyledDrawerListItem>
                <StyledDrawerLink href={path.register} onClick={closeDrawer}>
                  Register
                </StyledDrawerLink>
              </StyledDrawerListItem>
              <StyledDrawerListItem>
                <StyledDrawerLink href={path.login} onClick={closeDrawer}>
                  Login
                </StyledDrawerLink>
              </StyledDrawerListItem>
            </StyledDrawerList>
            )}
            {props.isLoggedIn && (
            <StyledDrawerList>
              <StyledDrawerListItem>
                <StyledDrawerLink href={path.home} onClick={closeDrawer}>
                  Back to Home
                </StyledDrawerLink>
              </StyledDrawerListItem>

              <StyledDrawerListItem>
                <StyledDrawerLink href={path.designer_new} onClick={closeDrawer}>
                  New Doodle
                </StyledDrawerLink>
              </StyledDrawerListItem>
              <StyledDrawerListItem>
                <StyledDrawerLink href={path.logout} onClick={closeDrawer}>
                  Logout
                </StyledDrawerLink>
              </StyledDrawerListItem>
            </StyledDrawerList>
            )}
            </StyledDrawer>
          )}
        </div>
      </StyledContainer>
      {/* Drawer goes here */}
    </StyledNavbar>
  );
};

Navigation.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default Navigation;
