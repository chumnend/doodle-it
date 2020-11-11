import { put } from 'redux-saga/effects';
import axios from 'axios';
import { authenticating, authSuccess, authFail, logout } from '../actions';

export function* authLoginSaga(action) {
  yield put(authenticating());

  const url = `${process.env.REACT_APP_API_PREFIX}/v1/auth/login?apiKey=${process.env.REACT_APP_API_KEY}`;

  const payload = {
    login: action.login,
    password: action.password,
  };

  try {
    const res = yield axios.post(url, payload);
    yield localStorage.setItem('id', res.data.id);
    yield localStorage.setItem('username', res.data.username);
    yield localStorage.setItem('token', res.data.token);
    yield put(authSuccess(res.data.id, res.data.username, res.data.token));
  } catch (err) {
    yield put(authFail(err.response.data.error));
  }
}

export function* authRegisterSaga(action) {
  yield put(authenticating());

  const url = `${process.env.REACT_APP_API_PREFIX}/v1/auth/register?apiKey=${process.env.REACT_APP_API_KEY}`;

  const payload = {
    username: action.username,
    email: action.email,
    password: action.password,
  };

  try {
    const res = yield axios.post(url, payload);
    yield localStorage.setItem('id', res.data.id);
    yield localStorage.setItem('username', res.data.username);
    yield localStorage.setItem('token', res.data.token);
    yield put(authSuccess(res.data.id, res.data.username, res.data.token));
  } catch (err) {
    yield put(authFail(err.response.data.error));
  }
}

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield put(logout());
}
