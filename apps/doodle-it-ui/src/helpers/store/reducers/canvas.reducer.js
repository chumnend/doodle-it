import * as actionTypes from '../actionTypes';

const initialState = {
  data: null,
  loading: false,
  saving: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CANVAS_SAVING:
      return {
        ...state,
        saving: true,
        error: null,
      };
    case actionTypes.CANVAS_SAVE_SUCCESS:
      return {
        ...state,
        data: {
          id: action.id,
          title: action.title,
          content: action.content,
          width: action.width,
          height: action.height,
        },
        saving: false,
        error: null,
      };
    case actionTypes.CANVAS_SAVE_FAIL:
      return {
        ...state,
        saving: false,
        error: action.error,
      };
    case actionTypes.CANVAS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.CANVAS_LOAD_SUCCESS:
      return {
        ...state,
        data: {
          id: action.id,
          title: action.title,
          content: action.content,
          width: action.width,
          height: action.height,
        },
        loading: false,
        error: null,
      };
    case actionTypes.CANVAS_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.CANVAS_CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
