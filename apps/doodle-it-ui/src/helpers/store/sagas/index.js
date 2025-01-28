import { takeEvery } from 'redux-saga/effects';

import * as authSagas from './auth.saga';
import * as canvasSagas from './canvas.saga';
import * as doodleSagas from './doodle.saga';
import * as actionTypes from '../actionTypes';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_REQUEST_LOGIN, authSagas.authLoginSaga);
  yield takeEvery(
    actionTypes.AUTH_REQUEST_REGISTER,
    authSagas.authRegisterSaga,
  );
  yield takeEvery(
    actionTypes.AUTH_REQUEST_VALIDATE,
    authSagas.authValidateSaga,
  );
  yield takeEvery(actionTypes.AUTH_REQUEST_LOGOUT, authSagas.logoutSaga);
}

export function* watchCanvas() {
  yield takeEvery(actionTypes.CANVAS_SAVE_REQUEST, canvasSagas.canvasSaveSaga);
  yield takeEvery(actionTypes.CANVAS_LOAD_REQUEST, canvasSagas.canvasLoadSaga);
}

export function* watchDoodle() {
  yield takeEvery(
    actionTypes.DOODLES_REQUEST_FETCH,
    doodleSagas.doodlesFetchSaga,
  );
  yield takeEvery(
    actionTypes.DOODLES_REQUEST_DELETE,
    doodleSagas.doodlesDeleteSaga,
  );
}
