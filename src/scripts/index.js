import "../pages/index.css";
import initialCards from "./cards.js";

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const arrPopup = document.querySelectorAll(".popup");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupClose = document.querySelectorAll(".popup__close");

// @todo: Темплейт карточки
function createCard(cardData, removeCard) {
  const container = cardTemplate.querySelector(".places__item");
  const card = container.cloneNode(true);
  const buttonRemove = card.querySelector(".card__delete-button");
  const cardImage = card.querySelector(".card__image");

  card.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;

  cardImage.addEventListener("click", () => {
    openPopup(popupTypeImage);
  });

  buttonRemove.addEventListener("click", () => removeCard(card));

  return card;
}

// @todo: Функция удаления карточки
function removeCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  let cardTemplate = createCard(cardData, removeCard);
  cardsContainer.append(cardTemplate);
});

// Слушатели на кнопки для открытия попапов
profileEditButton.addEventListener("click", () => {
  openPopup(popupTypeEdit);
});
profileAddButton.addEventListener("click", () => {
  openPopup(popupTypeNewCard);
});

// Открытие popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", clickHandler);
  document.addEventListener("keydown", function keyHandler(evt) {
    if (evt.key === "Escape") {
      closePopup(popup);
    } 
  });
}

// Закрыть popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", clickHandler);
  document.removeEventListener("keydown", function keyHandler() {});
}

// Слушатель закрытия на popup
function clickHandler(evt) {
  arrPopup.forEach((popup) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup)
    }
  });
}
