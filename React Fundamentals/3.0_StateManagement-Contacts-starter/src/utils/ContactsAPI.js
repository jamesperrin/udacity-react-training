// const api = import.meta.env.VITE_CONTACTS_API_URL || 'http://localhost:5001';
import config from '../config/config';

let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: 'application/json',
  Authorization: token,
};

export const getAll = () =>
  fetch(`${config.origin}/contacts`, { headers })
    .then((res) => res.json())
    .then((data) => data.contacts);

export const getAllAsync = async () => {
  const res = await fetch(`${config.origin}/contacts`, { headers });
  const data = await res.json();
  return data.contacts;
};

export const getById = (id) =>
  fetch(`${config.origin}/contacts/${id}`, { method: 'GET', headers })
    .then((res) => res.json())
    .then((data) => data.contact);

export const getByIdAsync = async (id) => {
  const res = await fetch(`${config.origin}/contacts/${id}`, { method: 'GET', headers });
  const data = await res.json();
  return data.contact;
};

export const remove = (contact) =>
  fetch(`${config.origin}/contacts/${contact.id}`, { method: 'DELETE', headers })
    .then((res) => res.json())
    .then((data) => data.contact);

export const removeById = (id) =>
  fetch(`${config.origin}/contacts/${id}`, { method: 'DELETE', headers })
    .then((res) => res.json())
    .then((data) => data.contact);

export const removeByIdAsync = async (id) => {
  const res = await fetch(`${config.origin}/contacts/${id}`, { method: 'DELETE', headers });
  const data = await res.json();
  return data.contact;
};

export const create = (body) =>
  fetch(`${config.origin}/contacts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

export default {
  getAll,
  getAllAsync,
  getById,
  getByIdAsync,
  remove,
  removeById,
  removeByIdAsync,
  create,
};
