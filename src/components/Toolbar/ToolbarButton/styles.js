import styled from 'styled-components';
import { color, layout } from '../../../themes';

export const ToolbarButton = styled.button`
  width: ${layout.toolbarHeight};
  height: ${layout.toolbarHeight};
  color: ${(props) => {
    if (props.toggable) {
      return props.active ? color.blue : color.darkgrey;
    } else {
      return color.white;
    }
  }};
  font-size: 10px;
  font-family: inherit;
  text-align: center;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  outline: none;
  &:hover {
    background: ${color.white};
    color: ${color.ebony};
  }
`;
