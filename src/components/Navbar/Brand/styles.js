import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { color } from '../../../themes';

export const Brand = styled(Link)`
  font-family: 'Lily Script One', cursive;
  font-size: 2rem;
  color: ${color.white};
  text-decoration: none;
`;
