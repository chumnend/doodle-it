import styled from 'styled-components';
import { color, device } from '../../themes';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InnerContainer = styled.div`
  display: flex;
`;

export const Item = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  gap: 5px;
`;

export const ColorSquare = styled.div`
  height: 30px;
  width: 30px;
  background: ${(props) => props.color};
  cursor: pointer;
`;

export const ColorCode = styled.div`
  display: none;

  @media all and (min-width: ${device.lg}) {
    display: block;
  }
`;

export const ColorPicker = styled.div`
  position: absolute;
  z-index: 2;
  top: 45px;
`;

export const Button = styled.button`
  color: ${color.ebony};
  font-family: inherit;
  background: none;
  border: none;
  padding: 0.5rem;
  margin: 0 0.25rem;
  outline: none;
  cursor: pointer;
  &:hover {
    background: ${color.ebony};
    color: ${color.white};
  }
`;
