import PropTypes from 'prop-types';
import styled from 'styled-components';

import { layout } from '../../../helpers/themes';

export const StyledCanvasArea = styled.div`
  width: 100%;
  height: calc(100% - ${layout.toolbarHeight});
  padding: 20px;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(${props => props.scale});
  transform-origin: 0 0;
`;

const CanvasArea = (props) => {
  return (
    <StyledCanvasArea
      scale={props.scale}
      onClick={props.handleClick}
      data-testid='canvasArea'
    >
      {props.children}
    </StyledCanvasArea>
  );
};

CanvasArea.propTypes = {
  children: PropTypes.node,
  scale: PropTypes.number,
  handleClick: PropTypes.func,
};

export default CanvasArea;
