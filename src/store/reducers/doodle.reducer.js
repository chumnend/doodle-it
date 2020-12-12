import * as actionTypes from '../actionTypes';

const initialState = {
  doodles: [],
  fetching: false,
  deleting: false,
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
    case actionTypes.DOODLES_DELETING:
      return {
        ...state,
        deleting: true,
        error: null,
      };
    case actionTypes.DOODLES_DELETE_SUCCESS:
      return {
        ...state,
        doodles: state.doodles.filter((d) => d._id !== action.doodleId),
        deleting: false,
        error: null,
      };
    case actionTypes.DOODLES_DELETE_FAIL:
      return {
        ...state,
        deleting: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
