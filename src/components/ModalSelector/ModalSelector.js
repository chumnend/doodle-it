import PropTypes from 'prop-types';
import BackgroundModal from '../BackgroundModal';
import ClearModal from '../ClearModal';
import ResizeModal from '../ResizeModal';
import SaveModal from '../SaveModal';
import ShapeModal from '../ShapeModal';

const ModalSelector = (props) => {
  switch (props.selected) {
    case props.options.SHAPES:
      return (
        <ShapeModal
          close={props.close}
          addLine={props.addLine}
          addCircle={props.addCircle}
          addRect={props.addRect}
          addTriangle={props.addTriangle}
          addText={props.addText}
        />
      );
    case props.options.CLEAR:
      return <ClearModal close={props.close} clearCanvas={props.clearCanvas} />;
    case props.options.SAVE:
      return (
        <SaveModal
          close={props.close}
          title={props.title}
          changeTitle={props.changeTitle}
          saveCanvas={props.saveCanvas}
        />
      );
    case props.options.BACKGROUND:
      return (
        <BackgroundModal
          close={props.close}
          backgroundColor={props.backgroundColor}
          changeBackgroundColor={props.changeBackgroundColor}
        />
      );
    case props.options.RESIZE:
      return (
        <ResizeModal
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
  children: PropTypes.node.isRequired,
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
