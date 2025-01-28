import PropTypes from 'prop-types';
import styled from 'styled-components';

import { path } from '../../../helpers/constants';
import { device, color } from '../../../helpers/themes';

export const StyledMenu = styled.span`
  font-size: 2rem;
  cursor: pointer;
  color: ${color.white};

  @media all and (min-width: ${device.md}) {
    display: none;
  }
`;

export const StyledUl = styled.ul`
  list-style: none;
  display: none;

  @media all and (min-width: ${device.md}) {
    display: flex;
  }
`;

export const StyledLi = styled.li`
  display: inline-block;
  padding: 0.5rem;
`;

export const StyledLink = styled.a`
  text-decoration: none;
  background: inherit;
  color: ${color.white};
  font-size: 1rem;
  &:hover {
    color: ${color.blue};
  }
`;

const Navbar = (props) => {
  return (
    <nav>
      <StyledMenu className="material-icons" onClick={props.open}>
        menu
      </StyledMenu>
      {!props.isLoggedIn && (
        <StyledUl>
          <StyledLi>
            <StyledLink href={path.register}>Register</StyledLink>
          </StyledLi>
          <StyledLi>
            <StyledLink href={path.login}>Login</StyledLink>
          </StyledLi>
        </StyledUl>
      )}
      {props.isLoggedIn && (
        <StyledUl>
          <StyledLi>
            <StyledLink href={path.home}>Back to Home</StyledLink>
          </StyledLi>
          <StyledLi>
            <StyledLink href={path.designer_new}>
              New Doodle
            </StyledLink>
          </StyledLi>
          <StyledLi>
            <StyledLink href={path.logout}>Logout</StyledLink>
          </StyledLi>
        </StyledUl>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
  open: PropTypes.func,
};

export default Navbar;
