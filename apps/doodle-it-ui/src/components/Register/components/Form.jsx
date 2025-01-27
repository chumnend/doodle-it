import PropTypes from 'prop-types';
import styled from 'styled-components';

import { device, color } from '../../../helpers/themes';

export const StyledForm = styled.form`
  width: 90%;
  max-width: 480px;
  margin: 2rem auto;
  padding: 2rem 1rem;
  background: ${color.ebony};
  color: ${color.white};
  border-radius: 10px;

  p {
    text-align: center;
  }

  @media all and (min-width: ${device.md}) {
    padding: 2rem;
    margin: 4rem auto;
  }
`;

const Form = (props) => {
  return <StyledForm onSubmit={props.submit}>{props.children}</StyledForm>;
};

Form.propTypes = {
  children: PropTypes.node,
  submit: PropTypes.func,
};

export default Form;
