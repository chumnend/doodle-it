import PropTypes from 'prop-types';
import FreeContextbar from './FreeContextbar';
import ActiveContextbar from './ActiveContextbar';
import * as Styles from './styles';

const Contextbar = (props) => {
  return (
    <Styles.Contextbar>
      {props.freeMode && <FreeContextbar color={props.color} />}
      {props.activeObject && (
        <ActiveContextbar activeObject={props.activeObject} />
      )}
    </Styles.Contextbar>
  );
};

Contextbar.propTypes = {
  freeMode: PropTypes.bool,
  activeObject: PropTypes.object,
  color: PropTypes.string,
  changeColor: PropTypes.func,
};

export default Contextbar;
