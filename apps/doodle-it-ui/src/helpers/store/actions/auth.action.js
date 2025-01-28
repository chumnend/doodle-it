import * as actionTypes from '../actionTypes';

export const authenticating = () => {
  return {
    type: actionTypes.AUTHENTICATING,
  };
};

export const authRequestLogin = (login, password) => {
  return {
    type: actionTypes.AUTH_REQUEST_LOGIN,
    login,
    password,
  };
};

export const authRequestRegister = (username, email, password) => {
  return {
    type: actionTypes.AUTH_REQUEST_REGISTER,
    username,
    email,
    password,
  };
};

export const authRequestValidate = () => {
  return {
    type: actionTypes.AUTH_REQUEST_VALIDATE,
  };
};

export const authSuccess = (id, username, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    id,
    username,
    token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const authRequestLogout = () => {
  return {
    type: actionTypes.AUTH_REQUEST_LOGOUT,
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};