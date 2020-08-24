import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './FormInput.css';

function FormInput({
  className,
  id,
  type,
  value,
  placeholder,
  onChange,
  label,
  ...props
}) {
  return (
    <div className={classNames(className, 'FormInput')}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={type}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

FormInput.defaultProps = {
  className: '',
  type: 'text',
  placeholder: '',
};

FormInput.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default FormInput;
