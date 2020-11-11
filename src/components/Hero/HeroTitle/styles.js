import styled from 'styled-components';
import { device, color } from '../../../themes';

export const HeroTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0.4rem 0;
  text-align: center;
  color: ${color.blue};

  @media all and (min-width: ${device.md}) {
    font-size: 2.4rem;
  }
`;
