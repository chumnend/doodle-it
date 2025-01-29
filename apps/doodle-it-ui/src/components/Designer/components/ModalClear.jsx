import PropTypes from 'prop-types';
import styled from 'styled-components';

import Modal from './Modal';

import { color } from '../../../helpers/themes';

export const StyledHeader = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const StyledBody = styled.div`
  text-align: center;
`;

export const StyledButton = styled.button`
  width: 80%;
  margin: 0.5rem auto;
  padding: 0.5rem;
  text-transform: capitalize;
  text-align: center;
  color: ${color.black};
  background: transparent;
  border: 1px solid ${color.black};
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;

  &:hover {
    color: ${color.white};
    background: ${color.black};
  }
`;

const ModalClear = (props) => {
  return (
    <Modal show close={props.close}>
      <StyledHeader>
        WARNING: This will clear all items on the canvas. Are you sure?
      </StyledHeader>
      <StyledBody>
        <StyledButton onClick={props.clearCanvas}>Clear All</StyledButton>
        <StyledButton onClick={props.close}>Cancel</StyledButton>
      </StyledBody>
    </Modal>
  );
};

ModalClear.propTypes = {
  close: PropTypes.func,
  clearCanvas: PropTypes.func,
};

export default ModalClear;
