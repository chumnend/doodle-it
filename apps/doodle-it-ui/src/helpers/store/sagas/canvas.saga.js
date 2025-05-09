import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions';

export function* canvasSaveSaga(action) {
  yield put(actions.canvasSaving());

  try {
    let url, res;
    if (action.doodleId) {
      url = `${import.meta.env.VITE_API_PREFIX}/v1/doodle/${action.doodleId}?apiKey=${import.meta.env.VITE_API_KEY}&userId=${action.userId}`;
      res = yield axios.put(url, action.doodle);
    } else {
      url = `${import.meta.env.VITE_API_PREFIX}/v1/doodle?apiKey=${import.meta.env.VITE_API_KEY}&userId=${action.userId}`;
      res = yield axios.post(url, action.doodle);
    }
    yield put(actions.canvasSaveSuccess(res.data));
  } catch (err) {
    yield put(actions.canvasSaveFail(err.response.data));
  }
}

export function* canvasLoadSaga(action) {
  yield put(actions.canvasLoading());

  try {
    const url = `${import.meta.env.VITE_API_PREFIX}/v1/doodle/${action.doodleId}?apiKey=${import.meta.env.VITE_API_KEY}&userId=${action.userId}`;
    const res = yield axios.get(url);
    yield put(actions.canvasLoadSuccess(res.data));
  } catch (err) {
    yield put(actions.canvasLoadFail(err.response.data));
  }
}
