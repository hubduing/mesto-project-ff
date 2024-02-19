import "../pages/index.css";
import {
  openPopup,
  closePopup,
  closePopupByEsc,
  clickPopupHandler,
} from "../components/modal.js";
import {
  clearValidation,
  setEventListeners,
} from "../components/validation.js";
import { getInitialUsers, getInitialCards, changeAvatar } from "./api.js";
import { validationConfig } from "../utils/constans.js";
import { renderCards } from "../components/card.js";

// @todo: DOM узлы
export const profileForm = document.forms["edit-profile"];
export const profileButton = profileForm.elements.profileButton;
export const cardsContainer = document.querySelector(".places__list");
export const name = profileForm.elements.name;
export const description = profileForm.elements.description;
export const popupTypeNewCard = document.querySelector(".popup_type_new-card");
export const profileEditButton = document.querySelector(".profile__edit-button");
export const profileAddButton = document.querySelector(".profile__add-button");
export const profileImage = document.querySelector(".profile__image");
export const popupArray = document.querySelectorAll(".popup");
export const profileTypeEditAvatar = document.querySelector('.popup_type_edit-avatar');
export const profileImageButton = profileTypeEditAvatar.querySelector('.popup__button');
export const nameInput = document.querySelector(".profile__title");
export const jobInput = document.querySelector(".profile__description");
export const profileImageInput = profileTypeEditAvatar.querySelector('.popup__input_type_url');
export const popupTypeEdit = document.querySelector(".popup_type_edit");


// Слушатели на кнопки для открытия попапов
profileEditButton.addEventListener("click", () => {
  openPopup(popupTypeEdit, closePopupByEsc, clickPopupHandler);
  clearValidation(popupTypeEdit, validationConfig);

  name.value = nameInput.textContent;
  description.value = jobInput.textContent;
});


profileAddButton.addEventListener("click", () => {
  openPopup(popupTypeNewCard, closePopupByEsc, clickPopupHandler);
  clearValidation(popupTypeNewCard, validationConfig);
});

profileImage.addEventListener("click", () => {
  openPopup(profileTypeEditAvatar, closePopupByEsc, clickPopupHandler);
  clearValidation(profileTypeEditAvatar, validationConfig);
});

// Popup animated
popupArray.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

// Открытие popup image
export function openPopupImage(cardImageSrc, cardImageAlt) {
  openPopup(popupTypeImage, closePopupByEsc, clickPopupHandler);

  const popupImage = document.querySelector(".popup__image");
  popupImage.src = cardImageSrc;
  popupImage.alt = cardImageAlt;

  const popupCaption = document.querySelector(".popup__caption");
  popupCaption.textContent = cardImageAlt;
}

// Сохранение информации о пользователе
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameInput.textContent = name.value;
  jobInput.textContent = description.value;
  closePopup(popupTypeEdit);
}

function handleProfileImageSubmit(evt) {
  evt.preventDefault();
  changeAvatar(profileImageInput).then((url) => {
    profileImage.style.background = `url(${url.avatar})`;
    profileImage.style.backgroundSize = "cover";
  });
  closePopup(profileTypeEditAvatar);
}

profileImageButton.addEventListener("click", handleProfileImageSubmit);
profileForm.addEventListener("submit", handleProfileFormSubmit);

// validation

const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

enableValidation(validationConfig);

// api
Promise.all([getInitialUsers(), getInitialCards()])
  .then(([responseUsers, responseCardData]) => {
    profileImage.style.background = `url(../images/edit-icon,svg), url(${responseUsers.avatar})`;
    profileImage.style.backgroundSize = "cover";
    nameInput.textContent = responseUsers.name;
    jobInput.textContent = responseUsers.about;
    // @todo: Вывести карточки на страницу
    renderCards(responseCardData, responseUsers._id);
  })
  .catch((err) => console.log(err));