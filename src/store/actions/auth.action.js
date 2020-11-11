import {
  AUTHENTICATING,
  AUTH_REQUEST_LOGIN,
  AUTH_REQUEST_REGISTER,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT_REQUEST,
  LOGOUT,
} from '../actionTypes';

export const authenticating = () => {
  return {
    type: AUTHENTICATING,
  };
};

export const authRequestLogin = (login, password) => {
  return {
    type: AUTH_REQUEST_LOGIN,
    login,
    password,
  };
};

export const authRequestRegister = (username, email, password) => {
  return {
    type: AUTH_REQUEST_REGISTER,
    username,
    email,
    password,
  };
};

export const authSuccess = (id, username, token) => {
  return {
    type: AUTH_SUCCESS,
    id,
    username,
    token,
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error,
  };
};

export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
