import axios from 'axios';

function logout() {
  delete axios.defaults.headers.common['Authorization'];
  window.localStorage.clear();
}

export default logout;
