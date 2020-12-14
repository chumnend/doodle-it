import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions';

export function* authLoginSaga(action) {
  yield put(actions.authenticating());

  const payload = {
    login: action.login,
    password: action.password,
  };

  try {
    const url = `${process.env.REACT_APP_API_PREFIX}/v1/auth/login?apiKey=${process.env.REACT_APP_API_KEY}`;
    const res = yield axios.post(url, payload);

    yield localStorage.setItem('id', res.data.id);
    yield localStorage.setItem('username', res.data.username);
    yield localStorage.setItem('token', res.data.token);

    yield (axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${res.data.token}`);

    yield put(
      actions.authSuccess(res.data.id, res.data.username, res.data.token),
    );
  } catch (err) {
    yield put(actions.authFail(err.response.data));
  }
}

export function* authRegisterSaga(action) {
  yield put(actions.authenticating());

  const payload = {
    username: action.username,
    email: action.email,
    password: action.password,
  };

  try {
    const url = `${process.env.REACT_APP_API_PREFIX}/v1/auth/register?apiKey=${process.env.REACT_APP_API_KEY}`;
    const res = yield axios.post(url, payload);

    yield localStorage.setItem('id', res.data.id);
    yield localStorage.setItem('username', res.data.username);
    yield localStorage.setItem('token', res.data.token);

    yield (axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${res.data.token}`);

    yield put(
      actions.authSuccess(res.data.id, res.data.username, res.data.token),
    );
  } catch (err) {
    yield put(actions.authFail(err.response.data));
  }
}

export function* authValidateSaga(action) {
  yield put(actions.authenticating());

  const id = yield localStorage.getItem('id');
  const username = yield localStorage.getItem('username');
  const token = yield localStorage.getItem('token');

  if (!token) {
    yield delete axios.defaults.headers.common['Authorization'];
    yield put(actions.authLogout());
  } else {
    yield (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`);
    yield put(actions.authSuccess(id, username, token));
  }
}

export function* logoutSaga(action) {
  yield localStorage.removeItem('id');
  yield localStorage.removeItem('username');
  yield localStorage.removeItem('token');
  yield delete axios.defaults.headers.common['Authorization'];
  yield put(actions.authLogout());
}
