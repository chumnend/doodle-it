import styled from 'styled-components';
import { device, layout } from '../../themes';

export const PageView = styled.div`
  width: 100%;
  height: calc(100vh - ${layout.navHeight});
  display: flex;
  flex-direction: column;

  @media all and (min-width: ${device.md}) {
    flex-direction: row;
  }
`;
