import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { BlockPicker as ColorPicker } from 'react-color';
import Modal from '../Modal';
import * as Styles from './styles';

const ModalBackground = (props) => {
  const [color, setColor] = useState(props.backgroundColor);

  const handleClick = () => {
    props.changeBackgroundColor(color.hex);
  };

  return (
    <Modal show close={props.close}>
      <Styles.Header>Set Background Color</Styles.Header>
      <Styles.Body>
        <ColorPicker color={color} onChange={setColor} triangle={'hide'} />
        <Styles.Button onClick={handleClick}>Set Background</Styles.Button>
        <Styles.Button onClick={props.close}>Cancel</Styles.Button>
      </Styles.Body>
    </Modal>
  );
};

ModalBackground.propTypes = {
  close: PropTypes.func,
  backgroundColor: PropTypes.string,
  changeBackgroundColor: PropTypes.func,
};

export default ModalBackground;
