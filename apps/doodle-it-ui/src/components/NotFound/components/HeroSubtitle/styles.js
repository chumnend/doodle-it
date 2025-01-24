import styled from 'styled-components';

import { color, device } from '../../../../helpers/themes';

export const HeroSubtitle = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  margin: 0.4rem 0;
  text-align: center;
  color: ${color.black};

  @media all and (min-width: ${device.md}) {
    font-size: 1.2rem;
  }
`;
