import PropTypes from 'prop-types';
import * as Styles from './styles';

const Fab = (props) => {
  return (
    <Styles.Fab onClick={props.onClick}>
      <span className="material-icons">create</span>
    </Styles.Fab>
  );
};

Fab.propTypes = {
  onClick: PropTypes.func,
};

export default Fab;
