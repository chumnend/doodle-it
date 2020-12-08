import PropTypes from 'prop-types';
import Modal from '../Modal';
import * as Styles from './styles';

const ResizeModal = (props) => {
  return (
    <Modal show close={props.close}>
      <p>Resize</p>
    </Modal>
  );
};

ResizeModal.propTypes = {
  close: PropTypes.func,
  changeCanvasSize: PropTypes.func,
};

export default ResizeModal;
