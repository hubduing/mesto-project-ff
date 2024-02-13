import { config } from "../components/constans.js";
import { openPopup } from "../components/modal.js";

export const getInitialUsers = (config) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
};

export function getInitialCards(config) {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}
export let responseCards = await getInitialCards(config);

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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
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

export const likeCard = (config, _id, cardLikeButtonCounter, methodFetch) => {
  return fetch(`${config.baseUrl}/cards/likes/${_id}`, {
    method: methodFetch,
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      cardLikeButtonCounter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
};

export const changeAvatar = (config, profileImageInput, profileImage) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: profileImageInput.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((url) => {
      profileImage.style.background = `url(${url.avatar})`;
      profileImage.style.backgroundSize = "cover";
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
};
