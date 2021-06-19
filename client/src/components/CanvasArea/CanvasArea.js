import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './styles';

const CanvasArea = (props) => {
  return (
    <Styles.CanvasArea onClick={props.handleClick}>
      {props.children}
    </Styles.CanvasArea>
  );
};

CanvasArea.propTypes = {
  children: PropTypes.node,
  handleClick: PropTypes.func,
};

export default CanvasArea;
