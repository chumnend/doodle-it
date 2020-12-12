import PropTypes from 'prop-types';
import ModalBackground from '../ModalBackground';
import ModalClear from '../ModalClear';
import ModalResize from '../ModalResize';
import ModalSave from '../ModalSave';
import ModalShape from '../ModalShape';

const ModalSelector = (props) => {
  switch (props.selected) {
    case props.options.SHAPES:
      return (
        <ModalShape
          close={props.close}
          addLine={props.addLine}
          addCircle={props.addCircle}
          addRect={props.addRect}
          addTriangle={props.addTriangle}
          addText={props.addText}
        />
      );
    case props.options.CLEAR:
      return <ModalClear close={props.close} clearCanvas={props.clearCanvas} />;
    case props.options.SAVE:
      return (
        <ModalSave
          close={props.close}
          title={props.title}
          changeTitle={props.changeTitle}
          saveCanvas={props.saveCanvas}
        />
      );
    case props.options.BACKGROUND:
      return (
        <ModalBackground
          close={props.close}
          backgroundColor={props.backgroundColor}
          changeBackgroundColor={props.changeBackgroundColor}
        />
      );
    case props.options.RESIZE:
      return (
        <ModalResize
          close={props.close}
          width={props.width}
          height={props.height}
          changeCanvasSize={props.changeCanvasSize}
        />
      );
    default:
      return null;
  }
};

ModalSelector.propTypes = {
  options: PropTypes.object,
  selected: PropTypes.number,
  close: PropTypes.func,
  addLine: PropTypes.func,
  addCircle: PropTypes.func,
  addRect: PropTypes.func,
  addTriangle: PropTypes.func,
  addText: PropTypes.func,
  backgroundColor: PropTypes.string,
  changeBackgroundColor: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  changeCanvasSize: PropTypes.func,
  clearCanvas: PropTypes.func,
  title: PropTypes.string,
  changeTitle: PropTypes.func,
  saveCanvas: PropTypes.func,
};

export default ModalSelector;
