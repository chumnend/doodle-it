import * as actionTypes from '../actionTypes';

export const canvasSaving = () => {
  return {
    type: actionTypes.CANVAS_SAVING,
  };
};

export const canvasSaveRequest = (doodle, userId, doodleId) => {
  return {
    type: actionTypes.CANVAS_SAVE_REQUEST,
    doodle,
    userId,
    doodleId,
  };
};

export const canvasSaveSuccess = () => {
  return {
    type: actionTypes.CANVAS_SAVE_SUCCESS,
  };
};

export const canvasSaveFail = (error) => {
  return {
    type: actionTypes.CANVAS_SAVE_FAIL,
    error,
  };
};
