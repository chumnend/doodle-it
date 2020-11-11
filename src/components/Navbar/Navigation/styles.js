import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { device, color } from '../../../themes';

export const Navigation = styled.nav``;

export const Menu = styled.span`
  font-size: 2rem;
  cursor: pointer;
  color: ${color.white};

  @media all and (min-width: ${device.md}) {
    display: none;
  }
`;

export const Ul = styled.ul`
  list-style: none;
  display: none;

  @media all and (min-width: ${device.md}) {
    display: flex;
  }
`;

export const Li = styled.li`
  display: inline-block;
  padding: 0.5rem;
`;

export const NavItem = styled(Link)`
  text-decoration: none;
  background: inherit;
  color: ${color.white};
  font-size: 1.2rem;
  &:hover {
    color: ${color.blue};
  }
`;
