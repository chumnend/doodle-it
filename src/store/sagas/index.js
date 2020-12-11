import { takeEvery } from 'redux-saga/effects';
import {
  authLoginSaga,
  authRegisterSaga,
  authValidateSaga,
  logoutSaga,
} from './auth.saga';

import * as actionTypes from '../actionTypes';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_REQUEST_LOGIN, authLoginSaga);
  yield takeEvery(actionTypes.AUTH_REQUEST_REGISTER, authRegisterSaga);
  yield takeEvery(actionTypes.AUTH_REQUEST_VALIDATE, authValidateSaga);
  yield takeEvery(actionTypes.AUTH_LOGOUT_REQUEST, logoutSaga);
}
