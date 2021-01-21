import styled from 'styled-components';
import { color } from '../../themes';

export const Fab = styled.div`
  width: 64px;
  height: 64px;
  background: ${color.white};
  border-radius: 50%;
  position: fixed;
  right: 16px;
  bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
