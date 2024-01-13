import "../pages/index.css";
import { openPopup, closePopup, closePopupByEsc, clickPopupHandler } from "../components/modal.js";
import { renderCards } from "../components/card.js";
// @todo: DOM узлы
import {
  popupTypeNewCard,
  profileEditButton,
  profileAddButton,
  popupTypeEdit,
  nameInput,
  jobInput,
  profileForm,
  name,
  description,
  popupArray,
} from "../components/constans.js";

// @todo: Вывести карточки на страницу
renderCards();

// Слушатели на кнопки для открытия попапов
profileEditButton.addEventListener("click", () => {
  openPopup(popupTypeEdit, closePopupByEsc, clickPopupHandler);

  name.value = nameInput.textContent;
  description.value = jobInput.textContent;
});
profileAddButton.addEventListener("click", () => {
  openPopup(popupTypeNewCard, closePopupByEsc, clickPopupHandler);
});

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

profileForm.addEventListener("submit", handleProfileFormSubmit);
