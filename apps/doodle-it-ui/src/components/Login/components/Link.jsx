import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router';

import { color } from '../../../helpers/themes';

export const StyledLink = styled(NavLink)`
  text-decoration: none;
  background: inherit;
  color: ${color.blue};
  font-size: 1rem;
  &:hover {
    color: ${color.grey};
  }
`;

const Link = (props) => {
  return <StyledLink {...props}>{props.children}</StyledLink>;
};

Link.propTypes = {
  children: PropTypes.node,
};

export default Link;