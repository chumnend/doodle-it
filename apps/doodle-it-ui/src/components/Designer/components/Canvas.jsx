import PropTypes from 'prop-types';

const Canvas = (props) => {
  return (
    <div onClick={(e) => e.stopPropagation()} data-testid='canvas'>
      <canvas id={props.id}>Not supported by browser.</canvas>
    </div>
  );
};

Canvas.propTypes = {
  id: PropTypes.string,
}

export default Canvas;
