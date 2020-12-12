import * as actionTypes from '../actionTypes';

const initialState = {
  id: null,
  username: null,
  token: null,
  authenticating: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATING:
      return {
        ...state,
        authenticating: true,
        error: null,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        id: action.id,
        username: action.username,
        token: action.token,
        authenticating: false,
        error: null,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        authenticating: false,
        error: action.error,
      };
    case actionTypes.AUTH_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
