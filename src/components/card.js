import { openPopupImage } from "./modal";
import initialCards from "../scripts/cards.js";
import { closePopup } from "./modal"; 
import { 
  popupTypeNewCard,
  newPlace, 
  cardsContainer
} from "./constans.js";

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
  // удаление карточки
  buttonRemove.addEventListener("click", () => removeCard(card)); 
  // слушатель на открытие модального окна при нажатии на картинку
  cardImage.addEventListener("click", () =>  openPopupImage(cardImage.src, cardImage.alt));

  return card;
}

// Кнопка Like в карточках
export function addEventLike() {
  const cardLikeArrayButton = document.querySelectorAll('.card__like-button');
  
  cardLikeArrayButton.forEach(likeButton => {
    likeButton.addEventListener('click', () => clickLikeHandler(likeButton));
  })
}

function clickLikeHandler(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}

// @todo: Функция удаления карточки
export function removeCard(card) {
  card.remove();
}
// Добавление новой карточки
export function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const name = newPlace.elements["place-name"].value;
  const link = newPlace.elements.link.value;
  const alt = "";
  let tempObject = {
    name,
    link,
    alt,
  };
  let cardTemplate = createCard(tempObject, removeCard);
  cardsContainer.prepend(cardTemplate);

  newPlace.reset();
  closePopup(popupTypeNewCard);
}

export function renderCards() {
  initialCards.forEach((cardData) => {
    let cardTemplate = createCard(cardData, removeCard);
    cardsContainer.append(cardTemplate);
  });
}

newPlace.addEventListener("submit", handleFormSubmitCard);