import { openPopupImage } from "./modal";
import initialCards from "../scripts/cards.js";

const newPlace = document.forms["new-place"];
const cardsContainer = document.querySelector(".places__list");

// @todo: Темплейт карточки
export function createCard(cardData, removeCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const container = cardTemplate.querySelector(".places__item");
  const card = container.cloneNode(true);
  const buttonRemove = card.querySelector(".card__delete-button");
  const cardImage = card.querySelector(".card__image");
  const cardLikeButton = card.querySelector(".card__like-button");

  card.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;

  buttonRemove.addEventListener("click", () => removeCard(card));

  // Кнопка Like в карточках
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  });

  // popup image
  cardImage.addEventListener("click", () => {
    openPopupImage(cardImage.src, cardImage.alt);
  });

  return card;
}

// @todo: Функция удаления карточки
export function removeCard(card) {
  card.remove();
}
// Добавление новой карточки
export function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const name = newPlace.elements["place-name"].value;
  const url = newPlace.elements.link.value;
  const alt = "";
  let tempObject = {
    name,
    url,
    alt,
  };
  initialCards.unshift(tempObject);
  let cardTemplate = createCard(initialCards[0], removeCard);
  cardsContainer.prepend(cardTemplate);

  newPlace.reset();
  closePopup(popupTypeNewCard);
}

export function renderCards() {
  initialCards.forEach((cardData) => {
    let cardTemplate = createCard(cardData, removeCard);
    cardsContainer.append(cardTemplate);
  });
  newPlace.addEventListener("submit", handleFormSubmitCard);
}
