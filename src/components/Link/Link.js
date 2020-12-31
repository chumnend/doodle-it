import PropTypes from 'prop-types';
import * as Styles from './styles';

const Link = (props) => {
  return <Styles.NavLink {...props}>{props.children}</Styles.NavLink>;
};

Link.propTypes = {
  children: PropTypes.node,
};

export default Link;
