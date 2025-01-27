import PropTypes from 'prop-types';
import styled from 'styled-components';

import { color } from '../../../helpers/themes';

export const StyledDiv = styled.div`
  background: ${color.red};
  text-align: center;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 10px;
`;

const FormError = (props) => {
  return <StyledDiv>{props.children}</StyledDiv>;
};

FormError.propTypes = {
  children: PropTypes.node,
};

export default FormError;
