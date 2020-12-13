import * as actionTypes from '../actionTypes';

const initialState = {
  data: null,
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
    default:
      return state;
  }
};

export default reducer;
