import { takeEvery } from 'redux-saga/effects';
import {
  authLoginSaga,
  authRegisterSaga,
  authValidateSaga,
  logoutSaga,
} from './auth.saga';

import {
  AUTH_REQUEST_LOGIN,
  AUTH_REQUEST_REGISTER,
  AUTH_REQUEST_VALIDATE,
  LOGOUT_REQUEST,
} from '../actionTypes';

export function* watchAuth() {
  yield takeEvery(AUTH_REQUEST_LOGIN, authLoginSaga);
  yield takeEvery(AUTH_REQUEST_REGISTER, authRegisterSaga);
  yield takeEvery(AUTH_REQUEST_VALIDATE, authValidateSaga);
  yield takeEvery(LOGOUT_REQUEST, logoutSaga);
}
