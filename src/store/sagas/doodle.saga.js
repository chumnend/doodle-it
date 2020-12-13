import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions';

export function* doodlesFetchSaga(action) {
  yield put(actions.doodlesFetching());

  try {
    const url = `${process.env.REACT_APP_API_PREFIX}/v1/doodle?apiKey=${process.env.REACT_APP_API_KEY}&userId=${action.userId}`;
    const res = yield axios.get(url);
    yield put(actions.doodlesFetchSuccess(res.data));
  } catch (err) {
    yield put(actions.doodlesFetchFail(err.response.data));
  }
}

export function* doodlesDeleteSaga(action) {
  yield put(actions.doodlesDeleting());

  try {
    const url = `${process.env.REACT_APP_API_PREFIX}/v1/doodle/${action.doodleId}?apiKey=${process.env.REACT_APP_API_KEY}&userId=${action.userId}`;
    yield axios.delete(url);
    yield put(actions.doodlesDeleteSuccess(action.doodleId));
  } catch (err) {
    yield put(actions.doodlesDeleteFail(err.response.data));
  }
}
