import axios from 'axios';

export function getTokenHeader() {
  return axios.defaults.headers.common.Authorization;
}

export function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export async function callAPI(method, path, payload) {
  try {
    const data = axios[method.toLowerCase()](path, payload);
    return data;
  } catch (error) {
    try {
      error.message = error.response.data.message;
    } catch (e) {
      error.message = 'Something went wrong, try again later';
    } finally {
      throw error;
    }
  }
}
