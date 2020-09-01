import { callAPI } from './axios';
import config from '../config';

export async function create(userId, payload) {
  try {
    let url = `${config.prefix}/v1/doodle?apiKey=${config.key}&userId=${userId}`;
    let { data } = await callAPI('post', url, payload);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAll(userId) {
  try {
    let url = `${config.prefix}/v1/doodle?apiKey=${config.key}&userId=${userId}`;
    let { data } = await callAPI('get', url);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getOne(userId, itemId) {
  try {
    let url = `${config.prefix}/v1/doodle/${itemId}?apiKey=${config.key}&userId=${userId}`;
    let { data } = await callAPI('get', url);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function update(userId, itemId, item) {
  try {
    let url = `${config.prefix}/v1/doodle/${itemId}?apiKey=${config.key}&userId=${userId}`;
    let { data } = await callAPI('put', url, item);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function remove(userId, itemId) {
  try {
    let url = `${config.prefix}/v1/doodle/${itemId}?apiKey=${config.key}&userId=${userId}`;
    let { data } = await callAPI('delete', url);
    return data;
  } catch (error) {
    throw error;
  }
}
