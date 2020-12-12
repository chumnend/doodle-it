import { combineReducers } from 'redux';
import auth from './auth.reducer';
import doodle from './doodle.reducer';

const rootReducer = combineReducers({
  auth,
  doodle,
});

export default rootReducer;
