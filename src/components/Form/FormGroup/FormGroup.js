import PropTypes from 'prop-types';
import * as Styles from './styles';

const FormGroup = (props) => {
  return (
    <Styles.FormGroup>
      <Styles.Label htmlFor={props.id}>{props.label}</Styles.Label>
      <Styles.Input
        type={props.inputType}
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.changed}
      />
    </Styles.FormGroup>
  );
};

FormGroup.propTypes = {
  label: PropTypes.string,
  inputType: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  changed: PropTypes.func,
};

export default FormGroup;
