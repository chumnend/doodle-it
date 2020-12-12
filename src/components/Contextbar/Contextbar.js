import PropTypes from 'prop-types';
import ContextbarFree from '../ContextbarFree';
import ContextbarActive from '../ContextbarActive';
import * as Styles from './styles';

const Contextbar = (props) => {
  return (
    <Styles.Contextbar>
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
    </Styles.Contextbar>
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
