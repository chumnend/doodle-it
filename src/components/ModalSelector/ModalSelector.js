import PropTypes from 'prop-types';
import Modal from '../Modal';
import * as Styles from './styles';

// enumeration for Modal
const ModalTypes = {
  NONE: 0,
  SHAPES: 1,
  CLEAR: 2,
  SAVE: 3,
  SETTINGS: 4,
};

const ShapeModal = (props) => {
  return (
    <Modal show close={props.close}>
      <Styles.ShapeModalLayout>
        <Styles.ShapeModalButton
          onClick={props.addLine}
          title="Add a line element"
        >
          <Styles.LineIcon />
        </Styles.ShapeModalButton>
        <Styles.ShapeModalButton
          onClick={props.addCircle}
          title="Add a circle element"
        >
          <Styles.CircleIcon />
        </Styles.ShapeModalButton>
        <Styles.ShapeModalButton
          onClick={props.addRect}
          title="Add a rectangle element"
        >
          <Styles.RectangleIcon />
        </Styles.ShapeModalButton>
        <Styles.ShapeModalButton
          onClick={props.addTriangle}
          title="Add a triangle element"
        >
          <Styles.TriangleIcon />
        </Styles.ShapeModalButton>
        <Styles.ShapeModalButton
          onClick={props.addText}
          title="Add a text element"
        >
          <span className="material-icons">title</span>
        </Styles.ShapeModalButton>
      </Styles.ShapeModalLayout>
    </Modal>
  );
};

const ClearModal = (props) => {
  return (
    <Modal show close={props.close}>
      <p>Clear</p>
    </Modal>
  );
};

const SaveModal = (props) => {
  return (
    <Modal show close={props.close}>
      <p>Save</p>
    </Modal>
  );
};

const SettingsModal = (props) => {
  return (
    <Modal show close={props.close}>
      <p>Settings</p>
    </Modal>
  );
};

const ModalSelector = (props) => {
  switch (props.type) {
    case ModalTypes.SHAPES:
      return <ShapeModal {...props} />;
    case ModalTypes.CLEAR:
      return <ClearModal {...props} />;
    case ModalTypes.SAVE:
      return <SaveModal {...props} />;
    case ModalTypes.SETTINGS:
      return <SettingsModal {...props} />;
    default:
      return null;
  }
};

ModalSelector.propTypes = {
  type: PropTypes.number,
  close: PropTypes.func,
  addLine: PropTypes.func,
  addCircle: PropTypes.func,
  addRect: PropTypes.func,
  addTriangle: PropTypes.func,
  addText: PropTypes.func,
};

export default ModalSelector;
