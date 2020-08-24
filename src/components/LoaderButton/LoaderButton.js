import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../Button';
import './LoaderButton.css';

function LoaderButton({ className, isLoading, disabled, children, ...props }) {
  return (
    <Button
      className={classNames(className, 'LoaderButton')}
      disabled={disabled}
      {...props}
    >
      {isLoading ? (
        <div className="LoaderButton-loader" />
      ) : (
        <React.Fragment>{children}</React.Fragment>
      )}
    </Button>
  );
}

LoaderButton.defaultProps = {
  className: '',
  disabled: false,
};

LoaderButton.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default LoaderButton;
