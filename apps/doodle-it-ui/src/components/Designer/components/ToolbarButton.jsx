import PropTypes from 'prop-types';
import styled from 'styled-components';

import { color, layout } from '../../../helpers/themes';

export const StyledToolbarButton = styled.button`
  width: ${layout.toolbarHeight};
  height: ${layout.toolbarHeight};
  color: ${props => props.color};
  padding: 0 2px;
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

const ToolbarButton = (props) => {
  let iconColor;
  if (props.toggable) {
    iconColor = props.active ? color.blue : color.darkgrey;
  } else {
    iconColor = color.white;
  }

  return (
    <StyledToolbarButton
      color={iconColor}
      onClick={props.clicked}
    >
      {props.children}
    </StyledToolbarButton>
  );
};

ToolbarButton.propTypes = {
  children: PropTypes.node,
  toggable: PropTypes.bool,
  active: PropTypes.bool,
  clicked: PropTypes.func,
  title: PropTypes.string,
};

export default ToolbarButton;
