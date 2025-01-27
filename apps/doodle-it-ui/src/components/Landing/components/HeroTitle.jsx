import PropTypes from 'prop-types';
import styled from 'styled-components';

import { color, device } from '../../../helpers/themes';

export const StyledHeader = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0.4rem 0;
  text-align: center;
  color: ${color.blue};

  @media all and (min-width: ${device.md}) {
    font-size: 2.4rem;
  }
`;

const HeroTitle = (props) => {
  return <StyledHeader>{props.children}</StyledHeader>;
};

HeroTitle.propTypes = {
  children: PropTypes.node,
};

export default HeroTitle;
