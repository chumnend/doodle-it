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

export const StyledInputGroup = styled.div`
  margin: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  color: ${color.black};
`;

export const StyledLabel = styled.label`
  text-transform: capitalize;
  font-size: 0.9rem;
  font-family: inherit;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0.4rem;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${color.black};
  color: inherit;
  font-size: 1rem;
`;

const ModalSave = (props) => {
  return (
    <Modal show close={props.close}>
      <StyledHeader>Save Current Doodle?</StyledHeader>
      <StyledBody>
        <StyledInputGroup>
          <StyledLabel htmlFor="title">Set Title</StyledLabel>
          <StyledInput
            type="text"
            id="title"
            name="title"
            value={props.title}
            onChange={props.changeTitle}
          />
        </StyledInputGroup>
        <StyledButton onClick={props.saveCanvas}>Save</StyledButton>
        <StyledButton onClick={props.close}>Cancel</StyledButton>
      </StyledBody>
    </Modal>
  );
};

ModalSave.propTypes = {
  close: PropTypes.func,
  title: PropTypes.string,
  changeTitle: PropTypes.func,
  saveCanvas: PropTypes.func,
};

export default ModalSave;
