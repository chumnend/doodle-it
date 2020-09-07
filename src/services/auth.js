import { callAPI, setTokenHeader } from './axios';
import config from '../config';

export async function login(login, password) {
  try {
    let url = `${config.prefix}/v1/auth/login?apiKey=${config.key}`;
    let payload = { login, password };

    let { data } = await callAPI('post', url, payload);
    let { token, ...user } = data;

    // set token
    setTokenHeader(token);
    window.localStorage.setItem('id', user.id);
    window.localStorage.setItem('username', user.username);
    window.localStorage.setItem('token', token);

    return user;
  } catch (error) {
    throw error;
  }
}

export async function register(email, username, password) {
  try {
    let url = `${config.prefix}/v1/auth/register?apiKey=${config.key}`;
    let payload = { email, username, password };

    let { data } = await callAPI('post', url, payload);
    let { token, ...user } = data;

    // set token
    setTokenHeader(token);
    window.localStorage.setItem('id', user.id);
    window.localStorage.setItem('username', user.username);
    window.localStorage.setItem('token', token);

    return user;
  } catch (error) {
    throw error;
  }
}

export function logout() {
  setTokenHeader();
  window.localStorage.clear();
}
