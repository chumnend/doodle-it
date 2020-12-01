import PropTypes from 'prop-types';
import Modal from '../Modal';
import * as Styles from './styles';

const SaveModal = (props) => {
  return (
    <Modal show close={props.close}>
      <p>Save</p>
    </Modal>
  );
};

SaveModal.propTypes = {
  close: PropTypes.func,
  saveCanvas: PropTypes.func,
};

export default SaveModal;
