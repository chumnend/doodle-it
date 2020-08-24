import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Button.css';

function Button({ className, children, ...props }) {
  return (
    <button className={classNames(className, 'Button')} {...props}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: '',
};

Button.propTypes = {
  className: PropTypes.string,
};

export default Button;
