import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions';

export function* doodleSaveSaga(action) {
  yield put(actions.doodleSaving());

  const url = `${process.env.REACT_APP_API_PREFIX}/v1/doodle?apiKey=${process.env.REACT_APP_API_KEY}&userId=${action.userId}`;

  try {
    yield axios.post(url, action.doodle);
    yield put(actions.doodleSaveSuccess());
  } catch (err) {
    yield put(actions.doodleSaveFail(err.response.data));
  }
}

export function* doodlesFetchSaga(action) {
  yield put(actions.doodlesFetchFail);

  const url = `${process.env.REACT_APP_API_PREFIX}/v1/doodle?apiKey=${process.env.REACT_APP_API_KEY}&userId=${action.userId}`;

  try {
    const res = yield axios.get(url);
    console.log(res.data);
    yield put(actions.doodlesFetchSuccess(res.data));
  } catch (err) {
    yield put(actions.doodlesFetchFail(err.response.data));
  }
}
