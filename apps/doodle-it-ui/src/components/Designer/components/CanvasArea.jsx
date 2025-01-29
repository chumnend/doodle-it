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
`;

const CanvasArea = (props) => {
  return (
    <StyledCanvasArea onClick={props.handleClick}>
      {props.children}
    </StyledCanvasArea>
  );
};

CanvasArea.propTypes = {
  children: PropTypes.node,
  handleClick: PropTypes.func,
};

export default CanvasArea;
