import PropTypes from 'prop-types';
import Modal from '../Modal';

// enumeration for Modal
const ModalTypes = {
  NONE: 0,
  SHAPES: 1,
  CLEAR: 2,
  SAVE: 3,
  SETTINGS: 4,
};

const ModalSelector = (props) => {
  switch (props.type) {
    case ModalTypes.SHAPES:
      return (
        <Modal show close={() => props.action(ModalTypes.NONE)}>
          <p>Shapes</p>
        </Modal>
      );
    case ModalTypes.CLEAR:
      return (
        <Modal show close={() => props.action(ModalTypes.NONE)}>
          <p>Clear</p>
        </Modal>
      );
    case ModalTypes.SAVE:
      return (
        <Modal show close={() => props.action(ModalTypes.NONE)}>
          <p>Save</p>
        </Modal>
      );
    case ModalTypes.SETTINGS:
      return (
        <Modal show close={() => props.action(ModalTypes.NONE)}>
          <p>Settings</p>
        </Modal>
      );
    default:
      return null;
  }
};

ModalSelector.propTypes = {
  type: PropTypes.number,
  action: PropTypes.func,
};

export default ModalSelector;
