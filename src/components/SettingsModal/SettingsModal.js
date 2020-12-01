import PropTypes from 'prop-types';
import Modal from '../Modal';
import * as Styles from './styles';

const SettingsModal = (props) => {
  return (
    <Modal show close={props.close}>
      <p>Settings</p>
    </Modal>
  );
};

SettingsModal.propTypes = {
  close: PropTypes.func,
  changeCanvasColor: PropTypes.func,
  changeCanvasSize: PropTypes.func,
};

export default SettingsModal;
