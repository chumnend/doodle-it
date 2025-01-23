import * as actionTypes from '../actionTypes';

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

export const doodlesDeleting = () => {
  return {
    type: actionTypes.DOODLES_DELETING,
  };
};

export const doodlesRequestDelete = (userId, doodleId) => {
  return {
    type: actionTypes.DOODLES_REQUEST_DELETE,
    userId,
    doodleId,
  };
};

export const doodlesDeleteSuccess = (doodleId) => {
  return {
    type: actionTypes.DOODLES_DELETE_SUCCESS,
    doodleId,
  };
};

export const doodlesDeleteFail = (error) => {
  return {
    type: actionTypes.DOODLES_DELETE_FAIL,
    error,
  };
};
