import * as actionTypes from '../actionTypes';

const initialState = {
  doodles: [],
  fetching: false,
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
    case actionTypes.DOODLES_FETCHING:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case actionTypes.DOODLES_FETCH_SUCCESS:
      return {
        ...state,
        doodles: action.doodles,
        fetching: false,
        error: null,
      };
    case actionTypes.DOODLES_FETCH_FAIL:
      return {
        ...state,
        doodles: [],
        fetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
