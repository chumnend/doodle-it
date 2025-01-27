import PropTypes from 'prop-types';
import styled from 'styled-components';

export const StyledText = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0.8rem 0;
  text-align: center;
`;

const FormTitle = (props) => {
  return <StyledText>{props.children}</StyledText>;
};

FormTitle.propTypes = {
  children: PropTypes.node,
};

export default FormTitle;
