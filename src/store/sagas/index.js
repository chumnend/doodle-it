import { takeEvery } from 'redux-saga/effects';
import {
  authLoginSaga,
  authRegisterSaga,
  authValidateSaga,
  logoutSaga,
} from './auth.saga';
import {
  doodleSaveSaga,
  doodlesFetchSaga,
  doodlesDeleteSaga,
} from './doodle.saga';

import * as actionTypes from '../actionTypes';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_REQUEST_LOGIN, authLoginSaga);
  yield takeEvery(actionTypes.AUTH_REQUEST_REGISTER, authRegisterSaga);
  yield takeEvery(actionTypes.AUTH_REQUEST_VALIDATE, authValidateSaga);
  yield takeEvery(actionTypes.AUTH_LOGOUT_REQUEST, logoutSaga);
}

export function* watchDoodle() {
  yield takeEvery(actionTypes.DOODLE_SAVE_REQUEST, doodleSaveSaga);
  yield takeEvery(actionTypes.DOODLES_REQUEST_FETCH, doodlesFetchSaga);
  yield takeEvery(actionTypes.DOODLES_REQUEST_DELETE, doodlesDeleteSaga);
}
