import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Drawer from './components/Drawer';
import Navbar from './components/Navbar';

import { path } from '../../../../helpers/constants';
import { color, layout } from '../../../../helpers/themes';

export const StyledOuterDiv = styled.div`
  width: 100%;
  height: ${layout.navHeight};
  background: ${color.ebony};
  position: relative;
  z-index: 1;
`;

export const StyledInnerDiv = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledBrandLink = styled.a`
  font-family: 'Lily Script One', cursive;
  font-size: 2rem;
  color: ${color.white};
  text-decoration: none;
`;

const Navigation = (props) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const openDrawer = () => {
    setShowDrawer(true);
  }

  const closeDrawer = () => {
    setShowDrawer(false);
  }

  return (
    <StyledOuterDiv>
      <StyledInnerDiv>
        <StyledBrandLink href={path.landing}>
          Doodle It
        </StyledBrandLink>
        <Navbar
          isLoggedIn={props.isLoggedIn}
          open={openDrawer}
        />
      </StyledInnerDiv>
      <Drawer
        isLoggedIn={props.isLoggedIn}
        show={showDrawer}
        close={closeDrawer}
      />
    </StyledOuterDiv>
  );
};

Navigation.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default Navigation;
