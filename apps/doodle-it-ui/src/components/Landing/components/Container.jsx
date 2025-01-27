import PropTypes from 'prop-types';
import styled from 'styled-components';

import { color, device, layout } from '../../../helpers/themes';

export const StyledOuterContainer = styled.div`
  width: 100%;
  background: ${color.white};
  padding: 2rem 1rem;
  min-height: calc(100vh - ${layout.navHeight} - 400px);

  @media all and (min-width: ${device.md}) {
    min-height: calc(100vh - ${layout.navHeight} - 450px);
  }
`;

export const StyledInnerContainer = styled.div`
  margin: 0 auto;
  width: 100%;

  h2 {
    margin-bottom: 0.5rem;
  }

  @media all and (min-width: ${device.md}) {
    width: 80%;
  }

  @media all and (min-width: ${device.xl}) {
    width: 50%;
  }
`;

const Container = (props) => {
  return (
    <StyledOuterContainer >
      <StyledInnerContainer>{props.children}</StyledInnerContainer>
    </StyledOuterContainer>
  );
};

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
