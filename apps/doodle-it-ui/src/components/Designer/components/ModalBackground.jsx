import { useState } from 'react';
import PropTypes from 'prop-types';
import { BlockPicker as ColorPicker } from 'react-color';
import styled from 'styled-components';

import Modal from './Modal';

import { color } from '../../../helpers/themes';

export const StyledHeader = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const ModalBackground = (props) => {
  const [color, setColor] = useState(props.backgroundColor);

  const handleClick = () => {
    props.changeBackgroundColor(color.hex);
  };

  return (
    <Modal show close={props.close}>
      <StyledHeader>Set Background Color</StyledHeader>
      <StyledBody>
        <ColorPicker color={color} onChange={setColor} triangle={'hide'} />
        <StyledButton onClick={handleClick}>Set Background</StyledButton>
        <StyledButton onClick={props.close}>Cancel</StyledButton>
      </StyledBody>
    </Modal>
  );
};

ModalBackground.propTypes = {
  close: PropTypes.func,
  backgroundColor: PropTypes.string,
  changeBackgroundColor: PropTypes.func,
};

export default ModalBackground;
