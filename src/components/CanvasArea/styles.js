import styled from 'styled-components';
import { layout } from '../../themes';

export const CanvasArea = styled.div`
  width: 100%;
  height: calc(100% - ${layout.toolbarHeight});
  padding: 20px;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
