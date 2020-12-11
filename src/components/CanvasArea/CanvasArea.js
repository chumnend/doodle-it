import PropTypes from 'prop-types';
import * as Styles from './styles';

const CanvasArea = (props) => {
  return <Styles.CanvasArea>{props.children}</Styles.CanvasArea>;
};

CanvasArea.propTypes = {
  children: PropTypes.node,
};

export default CanvasArea;
