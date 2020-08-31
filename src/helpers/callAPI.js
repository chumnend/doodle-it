import axios from 'axios';

async function callAPI(method, path, payload) {
  try {
    const data = axios[method.toLowerCase()](path, payload);
    return data;
  } catch(error) {
    try {
      error.message = error.response.data.message;
    } catch (e) {
      error.message = 'Something went wrong, try again later';
    } finally {
      throw error;
    }
  }
}

export default callAPI;
