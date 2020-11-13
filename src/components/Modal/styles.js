import styled from 'styled-components';
import { color } from '../../themes';

export const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
`;

export const Container = styled.div`
  position: fixed;
  z-index: 999;
  background: ${color.white};
  width: auto;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
