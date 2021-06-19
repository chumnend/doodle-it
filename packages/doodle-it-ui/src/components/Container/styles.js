import styled from 'styled-components';
import { color, device, layout } from '../../themes';

export const Container = styled.div`
  width: 100%;
  background: ${color.white};
  padding: 2rem 1rem;
  min-height: calc(100vh - ${layout.navHeight} - 400px);

  @media all and (min-width: ${device.md}) {
    min-height: calc(100vh - ${layout.navHeight} - 450px);
  }
`;

export const InnerContainer = styled.div`
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
