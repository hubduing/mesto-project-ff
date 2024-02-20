import "../pages/index.css";
import {
  openPopup,
  closePopup,
  closePopupByEsc,
  clickPopupHandler,
  openPopupImage,
} from "../components/modal.js";
import {
  clearValidation,
  setEventListeners,
} from "../components/validation.js";
import {
  getInitialUsers,
  getInitialCards,
  changeAvatar,
  pathProfileUsers,
  pathCard,
} from "./api.js";
import {
  buttonCard,
  linkCard,
  nameCard,
  newPlace,
  validationConfig,
} from "../utils/constans.js";
import { addNewCard, createCard } from "../components/card.js";

// @todo: DOM узлы
export const profileForm = document.forms["edit-profile"];
export const profileButton = profileForm.elements["profile-button"];
export const cardsContainer = document.querySelector(".places__list");
export const name = profileForm.elements.name;
export const description = profileForm.elements.description;
export const popupTypeNewCard = document.querySelector(".popup_type_new-card");
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileAddButton = document.querySelector(".profile__add-button");
export const profileImage = document.querySelector(".profile__image");
export const popupArray = document.querySelectorAll(".popup");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTypeEditAvatar = document.querySelector(
  ".popup_type_edit-avatar"
);
export const profileFormAvatar = document.forms["profile-image"];
export const profileImageButton = profileFormAvatar.elements["card-avatar"];
export const profileImageInput = profileFormAvatar.elements["input-avatar"];
export const popupTypeEdit = document.querySelector(".popup_type_edit");

// Слушатели на кнопки для открытия попапов
profileEditButton.addEventListener("click", () => {
  openPopup(popupTypeEdit, closePopupByEsc, clickPopupHandler);
  clearValidation(popupTypeEdit, validationConfig);

  name.value = name.textContent;
  description.value = description.textContent;
});

profileAddButton.addEventListener("click", () => {
  openPopup(popupTypeNewCard, closePopupByEsc, clickPopupHandler);
  clearValidation(popupTypeNewCard, validationConfig);
});

profileImage.addEventListener("click", () => {
  openPopup(profileTypeEditAvatar, closePopupByEsc, clickPopupHandler);
  clearValidation(profileTypeEditAvatar, validationConfig);
});

buttonCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  buttonCard.innerHTML = "Загрузка...";
  pathCard(nameCard.value, linkCard.value)
    .then((res) => {
      addNewCard(res, cardsContainer);
      closePopup(popupTypeNewCard);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      buttonCard.textContent = "Сохранить";
      newPlace.reset();
    });
  
});

// Popup animated
popupArray.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

// Сохранение информации о пользователе
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileButton.innerHTML = "Загрузка...";
  profileTitle.textContent = name.value;
  profileDescription.textContent = description.value;
  pathProfileUsers(name.value, description.value)
    .then(() => {
      closePopup(popupTypeEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      profileButton.textContent = "Сохранить";
      profileForm.reset();
    });
}

function handleProfileImageSubmit(evt) {
  evt.preventDefault();
  profileImageButton.innerHTML = "Загрузка...";
  changeAvatar(profileImageInput)
    .then((url) => {
      profileImage.style.background = `url(${url.avatar})`;
      profileImage.style.backgroundSize = "cover";
      closePopup(profileTypeEditAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      profileImageButton.textContent = "Да";
      profileFormAvatar.reset();
    });
}

profileImageButton.addEventListener("submit", handleProfileImageSubmit);
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
    profileTitle.textContent = responseUsers.name;
    profileDescription.textContent = responseUsers.about;
    // @todo: Вывести карточки на страницу
    renderCards(responseCardData, responseUsers._id);
  })
  .catch((err) => console.log(err));

function renderCards(responseCards, myId) {
  responseCards.forEach((cardData) => {
    const cardTemplate = createCard(cardData, myId, openPopupImage);
    cardsContainer.append(cardTemplate);
  });
}
