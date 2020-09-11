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
    const res = await axios[method.toLowerCase()](path, payload);
    return res;
  } catch (error) {
    if(error.response) {
      error.message = error.response.data.message;
    } else {
      error.message = 'Server is not responding, please try again later.'
    }

    throw error;
  }
}
