import styled from 'styled-components';
import { color, layout } from '../../themes';

export const Navbar = styled.div`
  width: 100%;
  height: ${layout.navHeight};
  background: ${color.ebony};
  position: relative;
  z-index: 1;
`;

export const Container = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
