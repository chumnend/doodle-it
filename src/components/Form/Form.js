import PropTypes from 'prop-types';
import * as Styles from './styles';

const Form = (props) => {
  return <Styles.Form onSubmit={props.submit}>{props.children}</Styles.Form>;
};

Form.propTypes = {
  children: PropTypes.node,
  submit: PropTypes.func,
};

export default Form;
