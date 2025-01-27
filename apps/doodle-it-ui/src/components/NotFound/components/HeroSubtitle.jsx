import PropTypes from 'prop-types';
import styled from 'styled-components';

import { color, device } from '../../../helpers/themes';

export const StyledHeader = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  margin: 0.4rem 0;
  text-align: center;
  color: ${color.black};

  @media all and (min-width: ${device.md}) {
    font-size: 1.2rem;
  }
`;


const HeroSubtitle = (props) => {
  return <StyledHeader>{props.children}</StyledHeader>;
};

HeroSubtitle.propTypes = {
  children: PropTypes.node,
};

export default HeroSubtitle;
