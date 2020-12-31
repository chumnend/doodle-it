import PropTypes from 'prop-types';
import * as Styles from './styles';

const FormLink = (props) => {
  return <Styles.FormLink {...props}>{props.children}</Styles.FormLink>;
};

FormLink.propTypes = {
  children: PropTypes.node,
};

export default FormLink;
