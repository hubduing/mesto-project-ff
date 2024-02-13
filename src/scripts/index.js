import "../pages/index.css";
import {
  openPopup,
  closePopup,
  closePopupByEsc,
  clickPopupHandler,
} from "../components/modal.js";
import { renderCards } from "../components/card.js";
// @todo: DOM узлы
import {
  popupTypeNewCard,
  profileEditButton,
  profileAddButton,
  popupTypeEdit,
  nameInput,
  jobInput,
  profileImage,
  profileForm,
  name,
  description,
  popupArray,
  validationConfig,
  config,
  profileButton,
  nameCard,
  urlCard,
  buttonCard,
  profileTypeEditAvatar,
  profileImageInput,
  profileImageButton
} from "../components/constans.js";
import { setEventListeners } from "../components/validation.js";
import {
  getInitialUsers,
  pathProfileUsers,
  pathCard,
  changeAvatar
} from "./api.js";

// @todo: Вывести карточки на страницу
renderCards();

// Слушатели на кнопки для открытия попапов
profileEditButton.addEventListener("click", () => {
  openPopup(popupTypeEdit, closePopupByEsc, clickPopupHandler);
  clearValidation(profileForm, validationConfig);

  name.value = nameInput.textContent;
  description.value = jobInput.textContent;
});
profileAddButton.addEventListener("click", () => {
  openPopup(popupTypeNewCard, closePopupByEsc, clickPopupHandler);
  clearValidation(profileForm, validationConfig);
});

profileImage.addEventListener('click', () => {
  openPopup(profileTypeEditAvatar, closePopupByEsc, clickPopupHandler)
  clearValidation(profileForm, validationConfig);
})

// Popup animated
popupArray.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

// Сохранение информации о пользователе
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameInput.textContent = name.value;
  jobInput.textContent = description.value;
  closePopup(popupTypeEdit);
}

function handleProfileImageSubmit(evt) {
  evt.preventDefault();
  changeAvatar(config, profileImageInput, profileImage);
  closePopup(profileTypeEditAvatar);
}

profileImageButton.addEventListener('click', handleProfileImageSubmit);
profileForm.addEventListener("submit", handleProfileFormSubmit);

// validation

const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation(validationConfig);

export const clearValidation = (profileForm, validationConfig) => {
  return;
};

clearValidation(profileForm, validationConfig);

// api


await getInitialUsers(config)
  .then((res) => {
    nameInput.textContent = res.name;
    jobInput.textContent = res.about;
    profileImage.style.backgroundImage = res.avatar;
  })
  .catch((err) => console.log(err));

profileButton.addEventListener("click", () => {
  pathProfileUsers(config, name.value, description.value);
});

buttonCard.addEventListener("click", () => {
  pathCard(config, nameCard.value, urlCard.value);
});
