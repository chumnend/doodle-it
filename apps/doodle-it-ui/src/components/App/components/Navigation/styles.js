import styled, { keyframes }  from 'styled-components';

import { color, device, layout } from '../../../../helpers/themes';

export const Navbar = styled.div`
  width: 100%;
  height: ${layout.navHeight};
  background: ${color.ebony};
  position: relative;
  z-index: 1;
`;

export const Container = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Brand = styled.a`
  font-family: 'Lily Script One', cursive;
  font-size: 2rem;
  color: ${color.white};
  text-decoration: none;
`;

export const Menu = styled.span`
  font-size: 2rem;
  cursor: pointer;
  color: ${color.white};

  @media all and (min-width: ${device.md}) {
    display: none;
  }
`;

export const NavbarList = styled.ul`
  list-style: none;
  display: none;

  @media all and (min-width: ${device.md}) {
    display: flex;
  }
`;

export const NavbarListItem = styled.li`
  display: inline-block;
  padding: 0.5rem;
`;

export const NavbarLink = styled.a`
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

export const Drawer = styled.div`
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

export const CloseContainer = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: row-reverse;
`;

export const CloseIcon = styled.span`
  font-size: 2rem;
  cursor: pointer;
`;

export const DrawerList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

export const DrawerListItem = styled.li`
  display: inline-block;
  padding: 1rem;
`;

export const DrawerLink = styled.a`
  text-decoration: none;
  background: inherit;
  color: inherit;
  font-size: 1.3rem;

  &:hover {
    color: ${color.blue};
  }
`;