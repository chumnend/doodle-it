import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { device, color } from '../../../themes';

export const Drawer = styled.div`
  width: ${(props) => (props.show ? '100%' : '0')};
  height: 100vh;
  background: ${color.ebony};
  color: ${color.white};
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  transition: width 0.35s ease-out;
  display: flex;
  flex-flow: column;

  @media all and (min-width: ${device.lg}) {
    display: none;
  }
`;

export const CloseContainer = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  flex-direction: row-reverse;
`;

export const CloseIcon = styled.span`
  font-size: 2rem;
  cursor: pointer;
`;

export const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

export const Li = styled.li`
  display: inline-block;
  padding: 1rem;
`;

export const NavItem = styled(Link)`
  text-decoration: none;
  background: inherit;
  color: inherit;
  font-size: 1rem;
  &:hover {
    color: ${color.red};
  }
`;

export const Button = styled.button`
  text-decoration: none;
  background: inherit;
  color: ${color.white};
  font-size: 1rem;
  outline: none;
  cursor: pointer;
  border: none;
  &:hover {
    color: ${color.blue};
  }
`;
