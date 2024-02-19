import { config } from "../utils/constans.js";

function resolveCheck(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getInitialUsers() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(res => resolveCheck(res));
}

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(res => resolveCheck(res));
}

export const pathProfileUsers = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(res => resolveCheck(res));
};

export const removeCard = (_id) => {
  return fetch(`${config.baseUrl}/cards/${_id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(res => resolveCheck(res));
};

export const pathCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards `, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(res => resolveCheck(res));
};

export const likeCard = (_id, methodFetch) => {
  return fetch(`${config.baseUrl}/cards/likes/${_id}`, {
    method: methodFetch,
    headers: config.headers,
  }).then(res => resolveCheck(res));
};

export const changeAvatar = (profileImageInput) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: profileImageInput.value,
    }),
  }).then(res => resolveCheck(res));
};
