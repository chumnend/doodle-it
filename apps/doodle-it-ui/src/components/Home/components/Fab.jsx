
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { color } from '../../../helpers/themes';

export const StyledFab = styled.div`
  width: 64px;
  height: 64px;
  background: ${color.white};
  border-radius: 50%;
  position: fixed;
  right: 16px;
  bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Fab = (props) => {
  return (
    <StyledFab onClick={props.onClick}>
      <span className="material-icons">create</span>
    </StyledFab>
  );
};

Fab.propTypes = {
  onClick: PropTypes.func,
};

export default Fab;
