// const api = import.meta.env.VITE_CONTACTS_API_URL || 'http://localhost:5001';
import config from '../config/config';

let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: 'application/json',
  Authorization: token,
};

export const getAll = () =>
  fetch(`${config.apiURL}/contacts`, { headers })
    .then((res) => res.json())
    .then((data) => data.contacts);

export const remove = (contact) =>
  fetch(`${config.apiURL}/contacts/${contact.id}`, { method: 'DELETE', headers })
    .then((res) => res.json())
    .then((data) => data.contact);

export const create = (body) =>
  fetch(`${config.apiURL}/contacts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
