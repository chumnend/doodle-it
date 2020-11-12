import styled from 'styled-components';
import { device, color, layout } from '../../themes';

export const Toolbar = styled.div`
  width: 100%;
  height: ${layout.toolbarHeight};
  background: ${color.ebony};
  display: flex;

  @media all and (min-width: ${device.md}) {
    width: ${layout.toolbarHeight};
    height: 100%;
    flex-direction: column;
  }
`;

export const ToolbarIcon = styled.span`
  width: 100%;
`;

export const ToolbarName = styled.p`
  width: 100%;
`;
