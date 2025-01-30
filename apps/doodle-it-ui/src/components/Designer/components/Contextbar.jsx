import PropTypes from 'prop-types';
import styled from 'styled-components';

import ContextbarActive from './ContextbarActive';
import ContextbarFree from './ContextbarFree';

import { color, layout } from '../../../helpers/themes';

export const StyledContextbar = styled.div`
  width: 100%;
  height: ${layout.toolbarHeight};
  background: ${color.white};
`;

const Contextbar = (props) => {
  return (
    <StyledContextbar data-testid='contextbar'>
      {props.freeMode && (
        <ContextbarFree
          color={props.color}
          changeColor={props.changeColor}
          penWidth={props.penWidth}
          changePenWidth={props.changePenWidth}
        />
      )}
      {props.activeObject && (
        <ContextbarActive
          activeObject={props.activeObject}
          changeColor={props.changeColor}
          sendObjectToTop={props.sendObjectToTop}
          sendObjectToBottom={props.sendObjectToBottom}
          sendObjectForward={props.sendObjectForward}
          sendObjectBackward={props.sendObjectBackward}
          removeObject={props.removeObject}
        />
      )}
    </StyledContextbar>
  );
};

Contextbar.propTypes = {
  freeMode: PropTypes.bool,
  activeObject: PropTypes.object,
  color: PropTypes.string,
  changeColor: PropTypes.func,
  penWidth: PropTypes.number,
  changePenWidth: PropTypes.func,
  sendObjectToTop: PropTypes.func,
  sendObjectToBottom: PropTypes.func,
  sendObjectForward: PropTypes.func,
  sendObjectBackward: PropTypes.func,
  removeObject: PropTypes.func,
};

export default Contextbar;