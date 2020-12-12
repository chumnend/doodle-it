import PropTypes from 'prop-types';
import Modal from '../Modal';
import * as Styles from './styles';

const ModalSave = (props) => {
  return (
    <Modal show close={props.close}>
      <Styles.Header>Save Current Doodle?</Styles.Header>
      <Styles.Body>
        <Styles.InputGroup>
          <Styles.Label htmlFor="title">Set Title</Styles.Label>
          <Styles.Input
            type="text"
            id="title"
            name="title"
            value={props.title}
            onChange={props.changeTitle}
          />
        </Styles.InputGroup>
        <Styles.Button onClick={props.saveCanvas}>Save</Styles.Button>
        <Styles.Button onClick={props.close}>Cancel</Styles.Button>
      </Styles.Body>
    </Modal>
  );
};

ModalSave.propTypes = {
  close: PropTypes.func,
  title: PropTypes.string,
  changeTitle: PropTypes.func,
  saveCanvas: PropTypes.func,
};

export default ModalSave;
