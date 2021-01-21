import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from '../Modal';
import * as Styles from './styles';

const ModalResize = (props) => {
  const [resizeWidth, setResizeWidth] = useState(props.width);
  const [resizeHeight, setResizeHeight] = useState(props.height);

  const handleClick = () => {
    props.changeCanvasSize(parseInt(resizeWidth), parseInt(resizeHeight));
  };

  return (
    <Modal show close={props.close}>
      <Styles.Header>Resize the Canvas</Styles.Header>
      <Styles.Body>
        <Styles.InputGroup>
          <Styles.Label htmlFor="resizeWidth">New Width</Styles.Label>
          <Styles.Input
            type="number"
            id="resizeWidth"
            name="resizeWidth"
            placeholder="Enter new width..."
            value={resizeWidth}
            onChange={(event) => setResizeWidth(event.target.value)}
          />
        </Styles.InputGroup>
        <Styles.InputGroup>
          <Styles.Label htmlFor="resizeHeight">New Height</Styles.Label>
          <Styles.Input
            type="number"
            id="resizeHeight"
            name="resizeHeight"
            placeholder="Enter new height..."
            value={resizeHeight}
            onChange={(event) => setResizeHeight(event.target.value)}
          />
        </Styles.InputGroup>
        <Styles.Button
          disabled={resizeWidth <= 0 || resizeHeight <= 0}
          onClick={handleClick}
        >
          Resize
        </Styles.Button>
        <Styles.Button onClick={props.close}>Cancel</Styles.Button>
      </Styles.Body>
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
