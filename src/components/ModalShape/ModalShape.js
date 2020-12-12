import PropTypes from 'prop-types';
import Modal from '../Modal';
import * as Styles from './styles';

const ModalShape = (props) => {
  return (
    <Modal show close={props.close}>
      <Styles.Container>
        <Styles.Button onClick={props.addLine} title="Add a line element">
          <Styles.LineIcon />
        </Styles.Button>
        <Styles.Button onClick={props.addCircle} title="Add a circle element">
          <Styles.CircleIcon />
        </Styles.Button>
        <Styles.Button onClick={props.addRect} title="Add a rectangle element">
          <Styles.RectangleIcon />
        </Styles.Button>
        <Styles.Button
          onClick={props.addTriangle}
          title="Add a triangle element"
        >
          <Styles.TriangleIcon />
        </Styles.Button>
        <Styles.Button onClick={props.addText} title="Add a text element">
          <span className="material-icons">title</span>
        </Styles.Button>
      </Styles.Container>
    </Modal>
  );
};

ModalShape.propTypes = {
  close: PropTypes.func,
  addLine: PropTypes.func,
  addCircle: PropTypes.func,
  addRect: PropTypes.func,
  addTriangle: PropTypes.func,
  addText: PropTypes.func,
};

export default ModalShape;
