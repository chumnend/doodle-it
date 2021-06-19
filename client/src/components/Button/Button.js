import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './styles';

const Button = (props) => {
  return <Styles.Button {...props}>{props.children}</Styles.Button>;
};

Button.propTypes = {
  children: PropTypes.node,
};

export default Button;
