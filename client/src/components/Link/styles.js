import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { color } from '../../themes';

export const NavLink = styled(Link)`
  text-decoration: none;
  background: inherit;
  color: ${color.blue};
  font-size: 1rem;
  &:hover {
    color: ${color.grey};
  }
`;
