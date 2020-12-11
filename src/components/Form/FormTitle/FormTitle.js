import PropTypes from 'prop-types';
import * as Styles from './styles';

const FormTitle = (props) => {
  return <Styles.FormTitle>{props.children}</Styles.FormTitle>;
};

FormTitle.propTypes = {
  children: PropTypes.node,
};

export default FormTitle;
