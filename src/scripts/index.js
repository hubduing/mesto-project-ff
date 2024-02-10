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

// validation

const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  // Находим все поля формы и сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  // Находим в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(".popup__button");

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add("form__submit_inactive");
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove("form__submit_inactive");
  }
};
