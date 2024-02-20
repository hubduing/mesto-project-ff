import { removeCard, likeCard } from "../scripts/api.js";

// @todo: Темплейт карточки
export function createCard(cardData, myId, openPopupImage) {
  const profileForm = document.forms["edit-profile"];
  const name = profileForm.elements.name;
  const description = profileForm.elements.description;
  const cardTemplate = document.querySelector("#card-template").content;
  const container = cardTemplate.querySelector(".places__item");
  const card = container.cloneNode(true);
  const buttonRemove = card.querySelector(".card__delete-button");
  const cardImage = card.querySelector(".card__image");
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardLikeButtonCounter = card.querySelector(
    ".card__like-button-counter"
  );
  const popupTypeImage = document.querySelector(".popup_type_image");
  card.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;
  cardLikeButtonCounter.textContent = cardData.likes.length;

  // созданна ли мной карточка
  checkMyCard(cardData, myId, buttonRemove);
  // проверка лайка карточки
  checkMylike(cardData, myId, cardLikeButton);

  // Удаление карточки
  buttonRemove.addEventListener("click", () => {
    removeCard(cardData._id)
      .then(() => {
        card.remove();
      })
      .catch((err) => console.log(err));
  });
  // Лайк
  cardLikeButton.addEventListener("click", () => {
    likeButtonHandler(cardLikeButton, cardData._id, cardLikeButtonCounter);
  });
  // Слушатель на открытие модального окна при нажатии на картинку
  cardImage.addEventListener("click", () =>
    openPopupImage(popupTypeImage, cardImage.src, cardImage.alt)
  );
  return card;
}

function checkMyCard(cardData, myId, buttonRemove) {
  if (cardData.owner._id !== myId) {
    buttonRemove.style.display = "none";
  }
}

function checkMylike(cardData, myId, cardLikeButton) {
  cardData.likes.forEach((cardLike) => {
    if (cardLike._id == myId) {
      cardLikeButton.classList.add("card__like-button_is-active");
    }
  });
}
// Добавление новой карточки
export function addNewCard(res, cardsContainer) {
  const cardData = {
    name: res.name,
    link: res.link,
    alt: "",
    likes: [],
    owner: res.owner,
    _id: res._id,
  };
  const cardTemplate = createCard(cardData, res.owner._id);
  cardsContainer.prepend(cardTemplate);
}

// Кнопка Like в карточках
function likeButtonHandler(likeButton, _id, cardLikeButtonCounter) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    likeCard(_id, "DELETE").then((res) => {
      likeButton.classList.remove("card__like-button_is-active");
      cardLikeButtonCounter.textContent = res.likes.length;
    });
  } else {
    likeCard(_id, "PUT").then((res) => {
      likeButton.classList.add("card__like-button_is-active");
      cardLikeButtonCounter.textContent = res.likes.length;
    });
  }
}
