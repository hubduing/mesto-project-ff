const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

export const clearValidation = (profileForm, validationConfig) => {
  let input = profileForm.querySelectorAll(validationConfig.inputSelector);
  const submitButton = profileForm.querySelector(
    validationConfig.submitButtonSelector
  );
  const inputError = profileForm.querySelectorAll(
    validationConfig.inputErrorClass
  );
  input.forEach((input) => {
    if (input.classList.contains(validationConfig.errorClass)) {
      input.classList.remove(validationConfig.errorClass);
    }
  });
  // убираем видимость ошибки
  inputError.forEach((error) => {
    if (error.classList.contains(validationConfig.errorClass)) {
      error.classList.remove(validationConfig.errorClass);
      error.textContent = "";
    }
  });
  submitButton.disabled = true;
  submitButton.classList.add(validationConfig.inactiveButtonClass);
};

export const setEventListeners = (formElement, validationConfig) => {
  // Находим все поля формы и сделаем из них массив
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  // Находим в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};
