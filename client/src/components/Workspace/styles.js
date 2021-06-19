import styled from 'styled-components';
import { device, layout } from '../../themes';

export const Workspace = styled.div`
  width: 100%;
  height: calc(100% - ${layout.toolbarHeight});

  @media all and (min-width: ${device.md}) {
    width: calc(100% - ${layout.toolbarHeight});
    height: 100%;
  }
`;
