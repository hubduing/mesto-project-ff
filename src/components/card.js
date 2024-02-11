import {
  openPopupImage,
  openPopup,
  closePopup,
  closePopupByEsc,
  clickPopupHandler,
} from "./modal";
import { responseCards } from "../scripts/api.js";
import {
  popupTypeNewCard,
  newPlace,
  cardsContainer,
  config,
  popupTypeRemoveCard,
  buttonRemoveCard,
} from "./constans.js";
import { removeCard as deleteCard } from "../scripts/api.js";
import { clearValidation } from "../scripts/index.js";

export function renderCards() {
  responseCards.forEach((res) => {
    const cardTemplate = createCard(
      res,
      removeCard,
      likeButtonHandler,
      openPopupImage
    );
    cardsContainer.append(cardTemplate);
  });
}

// @todo: Темплейт карточки
export function createCard(
  cardData,
  removeCard,
  likeButtonHandler,
  openPopupImage
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const container = cardTemplate.querySelector(".places__item");
  const card = container.cloneNode(true);
  const buttonRemove = card.querySelector(".card__delete-button");
  const cardImage = card.querySelector(".card__image");
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardLikeButtonCounter = card.querySelector(".card__like-button-counter");

  card.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;
  cardLikeButtonCounter.textContent = cardData.likes.length;
  // Удаление карточки
  buttonRemove.addEventListener("click", () =>
    removeCard(config, cardData._id)
  );
  // Лайк
  cardLikeButton.addEventListener("click", () =>
    likeButtonHandler(cardLikeButton)
  );

  if (cardData.owner._id !== "a6fb6bb20f197f449e715fb3") {
    buttonRemove.style.display = "none";
  }

  // Слушатель на открытие модального окна при нажатии на картинку
  cardImage.addEventListener("click", () =>
    openPopupImage(cardImage.src, cardImage.alt)
  );

  return card;
}

// Кнопка Like в карточках
function likeButtonHandler(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

// @todo: Функция удаления карточки
export function removeCard(config, _id) {
  openPopup(popupTypeRemoveCard, closePopupByEsc, clickPopupHandler);
  // clearValidation(profileForm, validationConfig);

  buttonRemoveCard.addEventListener("click", () => {
    deleteCard(config, _id);
    closePopup(popupTypeRemoveCard);
  });
}
// Добавление новой карточки
export function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const name = newPlace.elements["place-name"].value;
  const link = newPlace.elements.link.value;
  const alt = "";
  let cardData = {
    name,
    link,
    alt,
    likes: [],
    owner: {}
  };

  let cardTemplate = createCard(
    cardData,
    removeCard,
    likeButtonHandler,
    openPopupImage
  );
  cardsContainer.prepend(cardTemplate);

  newPlace.reset();
  closePopup(popupTypeNewCard);
}

newPlace.addEventListener("submit", handleFormSubmitCard);
