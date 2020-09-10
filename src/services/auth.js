import { callAPI, setTokenHeader } from './axios';
import config from '../config';

export async function login(login, password) {
  try {
    const url = `${config.prefix}/v1/auth/login?apiKey=${config.key}`;
    const payload = { login, password };

    const { data } = await callAPI('post', url, payload);
    const { token, ...user } = data;

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
    const url = `${config.prefix}/v1/auth/register?apiKey=${config.key}`;
    const payload = { email, username, password };

    const { data } = await callAPI('post', url, payload);
    const { token, ...user } = data;

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
