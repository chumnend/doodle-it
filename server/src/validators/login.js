'use strict';

const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function (data) {
  const errors = {};

  // convert empty fields to empty strings
  data.login = !isEmpty(data.login) ? data.login : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // validate the inputs
  if (Validator.isEmpty(data.login)) {
    errors.login = 'Login field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
