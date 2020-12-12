import * as actionTypes from '../actionTypes';

export const doodleSaving = () => {
  return {
    type: actionTypes.DOODLE_SAVING,
  };
};

export const doodleSaveRequest = (doodle, userId, doodleId) => {
  return {
    type: actionTypes.DOODLE_SAVE_REQUEST,
    doodle,
    userId,
    doodleId,
  };
};

export const doodleSaveSuccess = () => {
  return {
    type: actionTypes.DOODLE_SAVE_SUCCESS,
  };
};

export const doodleSaveFail = (error) => {
  return {
    type: actionTypes.DOODLE_SAVE_FAIL,
    error,
  };
};

export const doodlesFetching = () => {
  return {
    type: actionTypes.DOODLES_FETCHING,
  };
};

export const doodlesRequestFetch = (userId) => {
  return {
    type: actionTypes.DOODLES_REQUEST_FETCH,
    userId,
  };
};

export const doodlesFetchSuccess = (doodles) => {
  return {
    type: actionTypes.DOODLES_FETCH_SUCCESS,
    doodles,
  };
};

export const doodlesFetchFail = (error) => {
  return {
    type: actionTypes.DOODLES_FETCH_FAIL,
    error,
  };
};
