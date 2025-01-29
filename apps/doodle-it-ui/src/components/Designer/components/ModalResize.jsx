import { useState } from 'react';
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

const ModalResize = (props) => {
  const [resizeWidth, setResizeWidth] = useState(props.width);
  const [resizeHeight, setResizeHeight] = useState(props.height);

  const handleClick = () => {
    props.changeCanvasSize(parseInt(resizeWidth), parseInt(resizeHeight));
  };

  return (
    <Modal show close={props.close}>
      <StyledHeader>Resize the Canvas</StyledHeader>
      <StyledBody>
        <StyledInputGroup>
          <StyledLabel htmlFor="resizeWidth">New Width</StyledLabel>
          <StyledInput
            type="number"
            id="resizeWidth"
            name="resizeWidth"
            placeholder="Enter new width..."
            value={resizeWidth}
            onChange={(event) => setResizeWidth(event.target.value)}
          />
        </StyledInputGroup>
        <StyledInputGroup>
          <StyledLabel htmlFor="resizeHeight">New Height</StyledLabel>
          <StyledInput
            type="number"
            id="resizeHeight"
            name="resizeHeight"
            placeholder="Enter new height..."
            value={resizeHeight}
            onChange={(event) => setResizeHeight(event.target.value)}
          />
        </StyledInputGroup>
        <StyledButton
          disabled={resizeWidth <= 0 || resizeHeight <= 0}
          onClick={handleClick}
        >
          Resize
        </StyledButton>
        <StyledButton onClick={props.close}>Cancel</StyledButton>
      </StyledBody>
    </Modal>
  );
};

ModalResize.propTypes = {
  close: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  changeCanvasSize: PropTypes.func,
};

export default ModalResize;
