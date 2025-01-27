import PropTypes from 'prop-types';
import styled from 'styled-components';

import { color } from '../../../helpers/themes';

export const StyledDiv = styled.div`
  margin: 0.5rem 0;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  color: ${color.white};
`;

export const StyledLabel = styled.label`
  margin-bottom: 0.3rem;
  font-size: 1rem;
  font-family: inherit;
  color: inherit;
`;

export const StyledInput = styled.input`
  height: 2rem;
  padding: 0.7rem;
  background: transparent;
  font-size: 1rem;
  font-family: inherit;
  color: inherit;
  border: none;
  border-bottom: 1px solid ${color.white};
  &:focus {
    outline: none;
  }
`;

const FormGroup = (props) => {
  return (
    <StyledDiv>
      <StyledLabel htmlFor={props.id}>{props.label}</StyledLabel>
      <StyledInput
        type={props.inputType}
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.changed}
      />
    </StyledDiv>
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