import "../pages/index.css";
import { openPopup, closePopup } from "../components/modal.js"
import {  renderCards } from "../components/card.js"

// @todo: DOM узлы
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__description');
const popupForm = document.forms.edit_profile;
const name = popupForm.elements.name;
const description = popupForm.elements.description;

const popupArray = document.querySelectorAll('.popup');

// @todo: Вывести карточки на страницу
renderCards();

// Слушатели на кнопки для открытия попапов
profileEditButton.addEventListener("click", () => {
  openPopup(popupTypeEdit);

  name.value = nameInput.textContent;
  description.value = jobInput.textContent;
});
profileAddButton.addEventListener("click", () => {
  openPopup(popupTypeNewCard);
});

// Popup animated
popupArray.forEach((popup) => {
  popup.classList.add('popup_is-animated');
})

// Сохранение информации о пользователе
function handleFormSubmit(evt) {
  evt.preventDefault();
  
  nameInput.textContent = name.value;
  jobInput.textContent = description.value;
  closePopup(popupTypeEdit)
}

popupForm.addEventListener('submit', handleFormSubmit); 