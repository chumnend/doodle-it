import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions';

export function* canvasSaveSaga(action) {
  yield put(actions.canvasSaving());

  const url = `${process.env.REACT_APP_API_PREFIX}/v1/doodle?apiKey=${process.env.REACT_APP_API_KEY}&userId=${action.userId}`;

  try {
    const res = yield axios.post(url, action.doodle);
    yield put(actions.canvasSaveSuccess(res.data));
  } catch (err) {
    yield put(actions.canvasSaveFail(err.response.data));
  }
}
