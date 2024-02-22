import "../pages/index.css";
import {
  openPopup,
  closePopup,
  clickPopupHandler,
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
import { validationConfig } from "../utils/constans.js";
import { createCard } from "../components/card.js";

// @todo: DOM узлы
const profileForm = document.forms["edit-profile"];
const profileButton = profileForm.elements["profile-button"];
const cardsContainer = document.querySelector(".places__list");
const name = profileForm.elements.name;
const description = profileForm.elements.description;
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileImage = document.querySelector(".profile__image");
const popupArray = document.querySelectorAll(".popup");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTypeEditAvatar = document.querySelector(".popup_type_edit-avatar");
const profileFormAvatar = document.forms["profile-image"];
const profileImageButton = profileFormAvatar.elements["card-avatar"];
const profileImageInput = profileFormAvatar.elements["input-avatar"];
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeImage = document.querySelector(".popup_type_image");
const newPlace = document.forms["new-place"];
const nameCard = newPlace.elements["place-name"];
const linkCard = newPlace.elements.link;
const buttonCard = newPlace.elements["card-button"];
const popups = document.querySelectorAll(".popup");

// Слушатели на кнопки для открытия попапов
profileEditButton.addEventListener("click", () => {
  openPopup(popupTypeEdit);
  name.value = profileTitle.textContent;
  description.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
});

profileAddButton.addEventListener("click", () => {
  openPopup(popupTypeNewCard);
});

profileImage.addEventListener("click", () => {
  openPopup(profileTypeEditAvatar);
});

// Popup animated
popupArray.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

popups.forEach((popup) => {
  popup.addEventListener("click", clickPopupHandler);
});

// Открытие popup image
export function openPopupImage(cardImageSrc, cardImageAlt) {
  const popupImage = document.querySelector(".popup__image");
  popupImage.src = cardImageSrc;
  popupImage.alt = cardImageAlt;
  openPopup(popupTypeImage);

  const popupCaption = document.querySelector(".popup__caption");
  popupCaption.textContent = cardImageAlt;
}

// сохранение информации о карточке
newPlace.addEventListener("submit", handleCardFormSubmit);
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  buttonCard.innerHTML = "Загрузка...";
  pathCard(nameCard.value, linkCard.value)
    .then((res) => {
      addNewCard(res, cardsContainer);
      closePopup(popupTypeNewCard);
      newPlace.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      buttonCard.textContent = "Сохранить";
    });
}

// Сохранение информации о пользователе
profileForm.addEventListener("submit", handleProfileFormSubmit);
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileButton.innerHTML = "Загрузка...";
  pathProfileUsers(name.value, description.value)
    .then(() => {
      profileTitle.textContent = name.value;
      profileDescription.textContent = description.value;
      closePopup(popupTypeEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      profileButton.textContent = "Сохранить";
    });
}

// Сохранение информации о аватаре
profileFormAvatar.addEventListener("submit", handleProfileImageSubmit);
function handleProfileImageSubmit(evt) {
  evt.preventDefault();
  profileImageButton.innerHTML = "Загрузка...";
  changeAvatar(profileImageInput)
    .then((url) => {
      profileImage.style.background = `url(${url.avatar})`;
      profileImage.style.backgroundSize = "cover";
      closePopup(profileTypeEditAvatar);
      profileFormAvatar.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      profileImageButton.textContent = "Да";
    });
}

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
  const cardElement = createCard(cardData, res.owner._id);
  cardsContainer.prepend(cardElement);
}
