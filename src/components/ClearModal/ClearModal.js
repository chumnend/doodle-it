import PropTypes from 'prop-types';
import Modal from '../Modal';
import * as Styles from './styles';

const ClearModal = (props) => {
  return (
    <Modal show close={props.close}>
      <Styles.Header>
        WARNING: This will clear all items on the canvas. Are you sure?
      </Styles.Header>
      <Styles.Body>
        <Styles.Button onClick={props.clearCanvas}>Clear All</Styles.Button>
        <Styles.Button onClick={props.close}>Cancel</Styles.Button>
      </Styles.Body>
    </Modal>
  );
};

ClearModal.propTypes = {
  close: PropTypes.func,
  clearCanvas: PropTypes.func,
};

export default ClearModal;
