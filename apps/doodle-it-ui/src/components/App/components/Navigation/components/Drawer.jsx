import PropTypes from 'prop-types';
import styled from 'styled-components';

import { path } from '../../../../../helpers/constants';
import { color, device } from '../../../../../helpers/themes';

export const StyledDrawer = styled.div`
  width: ${(props) => (props.show ? '100%' : '0')};
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

  @media all and (min-width: ${device.lg}) {
    display: none;
  }
`;

export const StyledCloseContainer = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  flex-direction: row-reverse;
`;

export const StyledCloseIcon = styled.span`
  font-size: 2rem;
  cursor: pointer;
`;

export const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

export const StyledLi = styled.li`
  display: inline-block;
  padding: 1rem;
`;

export const StyledNavItem = styled.a`
  text-decoration: none;
  background: inherit;
  color: inherit;
  font-size: 1rem;

  &:hover {
    color: ${color.blue};
  }
`;

const Drawer = (props) => {
  return (
    <StyledDrawer show={props.show}>
      <StyledCloseContainer show={props.show}>
        <StyledCloseIcon className="material-icons" onClick={props.close}>
          close
        </StyledCloseIcon>
      </StyledCloseContainer>
      {!props.isLoggedIn && (
        <StyledUl>
          <StyledLi>
            <StyledNavItem href={path.register} onClick={props.close}>
              Register
            </StyledNavItem>
          </StyledLi>
          <StyledLi>
            <StyledNavItem href={path.login} onClick={props.close}>
              Login
            </StyledNavItem>
          </StyledLi>
        </StyledUl>
      )}
      {props.isLoggedIn && (
        <StyledUl>
          <StyledLi>
            <StyledNavItem href={path.home} onClick={props.close}>
              Back to Home
            </StyledNavItem>
          </StyledLi>
          <StyledLi>
            <StyledNavItem href={path.designer_new} onClick={props.close}>
              New Doodle
            </StyledNavItem>
          </StyledLi>
          <StyledLi>
            <StyledNavItem href={path.logout} onClick={props.close}>
              Logout
            </StyledNavItem>
          </StyledLi>
        </StyledUl>
      )}
    </StyledDrawer>
  );
};

Drawer.propTypes = {
  isLoggedIn: PropTypes.bool,
  show: PropTypes.bool,
  close: PropTypes.func,
};

export default Drawer;
