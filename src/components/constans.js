// @todo: DOM узлы
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileAddButton = document.querySelector(".profile__add-button");
export const popupTypeEdit = document.querySelector(".popup_type_edit");
export const nameInput = document.querySelector(".profile__title");
export const popupTypeRemoveCard = document.querySelector('.popup_type_remove-card');
export const buttonRemoveCard = popupTypeRemoveCard.querySelector('.popup__button');
export const jobInput = document.querySelector(".profile__description");
export const profileImage = document.querySelector(".profile__image");
export const profileForm = document.forms.edit_profile;
export const name = profileForm.elements.name;
export const profileButton = profileForm.elements.profileButton;
export const description = profileForm.elements.description;
export const popupArray = document.querySelectorAll(".popup");
export const popupTypeNewCard = document.querySelector(".popup_type_new-card");
export const popupTypeImage = document.querySelector(".popup_type_image");
export const newPlace = document.forms["new-place"];
export const nameCard = newPlace.elements["place-name"];
export const urlCard = newPlace.elements.link;
export const buttonCard = newPlace.elements["card-button"];
export const cardsContainer = document.querySelector(".places__list");
export const cardTemplate = document.querySelector("#card-template").content;
export const container = cardTemplate.querySelector(".places__item");
export const cardElement = container.cloneNode(true);
export const buttonRemove = cardElement.querySelector(".card__delete-button");
export const cardImage = cardElement.querySelector(".card__image");
export const cardLikeButton = cardElement.querySelector(".card__like-button");
export const cardLikeButtonCounter = cardElement.querySelector(".card__like-button-counter")
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-6",
  headers: {
    authorization: "15688f16-bc42-450f-883f-096c2cc8dd4d",
    "Content-Type": "application/json",
  },
};
