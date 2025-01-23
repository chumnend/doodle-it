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

export const canvasSaveSuccess = (data) => {
  return {
    type: actionTypes.CANVAS_SAVE_SUCCESS,
    id: data._id,
    title: data.title,
    content: data.content,
    width: data.width,
    height: data.height,
  };
};

export const canvasSaveFail = (error) => {
  return {
    type: actionTypes.CANVAS_SAVE_FAIL,
    error,
  };
};

export const canvasLoading = () => {
  return {
    type: actionTypes.CANVAS_LOADING,
  };
};

export const canvasLoadRequest = (userId, doodleId) => {
  return {
    type: actionTypes.CANVAS_LOAD_REQUEST,
    userId,
    doodleId,
  };
};

export const canvasLoadSuccess = (data) => {
  return {
    type: actionTypes.CANVAS_LOAD_SUCCESS,
    id: data._id,
    title: data.title,
    content: data.content,
    width: data.width,
    height: data.height,
  };
};

export const canvasLoadFail = (error) => {
  return {
    type: actionTypes.CANVAS_LOAD_FAIL,
    error,
  };
};

export const canvasClear = () => {
  return {
    type: actionTypes.CANVAS_CLEAR,
  };
};
