import { config } from "../components/constans.js";

export const getInitialUsers = (config) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
};

export function getInitialCards(config) {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}
export const responseCards = await getInitialCards(config)
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));

export const pathProfileUsers = (config, name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
};

export const removeCard = (config, _id) => {
  return fetch(`${config.baseUrl}/cards/${_id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
};

export const pathCard = (config, name, link) => {
  return fetch(`${config.baseUrl}/cards `, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
};
