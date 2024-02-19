const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.errorClass);
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
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
      hideInputError(formElement, inputElement, validationConfig);
    }
  };

  export const clearValidation = (profileForm, validationConfig) => {
    const formSelector = profileForm;
    let input = formSelector.querySelectorAll(validationConfig.inputSelector);
    const submitButton = formSelector.querySelector(validationConfig.submitButtonSelector);
    const inputError = formSelector.querySelector(validationConfig.inputErrorClass);
    input.forEach(input => {
      input.value = "";
    })
    submitButton.classList.add(validationConfig.inactiveButtonClass)
    // убираем видимость ошибки
    if (inputError.classList.contains(validationConfig.errorClass)) {
      inputError.classList.remove(validationConfig.errorClass)
    }
  }
  
  export const setEventListeners = (formElement, validationConfig) => {
    // Находим все поля формы и сделаем из них массив
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    // Находим в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

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



