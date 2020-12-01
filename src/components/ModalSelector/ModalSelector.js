import PropTypes from 'prop-types';
import ClearModal from '../ClearModal';
import SaveModal from '../SaveModal';
import SettingsModal from '../SettingsModal';
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
      return <SaveModal close={props.close} saveCanvas={props.saveCanvas} />;
    case props.options.SETTINGS:
      return (
        <SettingsModal
          close={props.close}
          changeCanvasColor={props.changeCanvasColor}
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
  changeCanvasColor: PropTypes.func,
  changeCanvasSize: PropTypes.func,
  clearCanvas: PropTypes.func,
  saveCanvas: PropTypes.func,
};

export default ModalSelector;
