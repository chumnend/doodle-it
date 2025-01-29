import PropTypes from 'prop-types';

const Canvas = (props) => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <canvas id={props.id}>Not supported by browser.</canvas>
    </div>
  );
};

Canvas.propTypes = {
  id: PropTypes.string,
}

export default Canvas;
