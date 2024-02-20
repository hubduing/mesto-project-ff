export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: ".popup__input-error",
  errorClass: "form__input-error_active",
};
export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-6",
  headers: {
    authorization: "15688f16-bc42-450f-883f-096c2cc8dd4d",
    "Content-Type": "application/json",
  },
};
export const newPlace = document.forms["new-place"];
export const nameCard = newPlace.elements["place-name"];
export const linkCard = newPlace.elements.link;
export const buttonCard = newPlace.elements["card-button"];
