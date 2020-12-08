import PropTypes from 'prop-types';
import Modal from '../Modal';
import * as Styles from './styles';

const BackgroundModal = (props) => {
  return (
    <Modal show close={props.close}>
      <p>Background</p>
    </Modal>
  );
};

BackgroundModal.propTypes = {
  close: PropTypes.func,
  changeCanvasColor: PropTypes.func,
};

export default BackgroundModal;
