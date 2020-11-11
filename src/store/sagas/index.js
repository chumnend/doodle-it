import { takeEvery } from 'redux-saga/effects';
import { 
  authLoginSaga,
  authRegisterSaga,
  logoutSaga,
} from './auth.saga';

import { 
  AUTH_REQUEST_LOGIN,
  AUTH_REQUEST_REGISTER,
  LOGOUT_REQUEST,
} from '../actionTypes';
 
export function* watchAuth() {
  yield takeEvery(AUTH_REQUEST_LOGIN, authLoginSaga);
  yield takeEvery(AUTH_REQUEST_REGISTER, authRegisterSaga);
  yield takeEvery(LOGOUT_REQUEST, logoutSaga);
};
