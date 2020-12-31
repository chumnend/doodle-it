import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { color } from '../../themes';

export const FormLink = styled(Link)`
  font-size: 1rem;
  margin: 0.8rem 0;
  text-align: center;
  color: ${color.white};
  display: block;
`;
