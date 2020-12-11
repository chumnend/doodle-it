import * as actionTypes from '../actionTypes';

const initialState = {
  doodles: [],
  saving: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DOODLE_SAVING:
      return {
        ...state,
        saving: true,
        error: null,
      };
    case actionTypes.DOODLE_SAVE_SUCCESS:
      return {
        ...state,
        saving: false,
        error: null,
      };
    case actionTypes.DOODLE_SAVE_FAIL:
      return {
        ...state,
        saving: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
