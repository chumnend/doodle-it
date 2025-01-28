import { combineReducers } from 'redux';

import auth from './auth.reducer';
import canvas from './canvas.reducer';
import doodle from './doodle.reducer';

const rootReducer = combineReducers({
  auth,
  canvas,
  doodle,
});

export default rootReducer;
