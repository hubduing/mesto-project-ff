// Открытие popup
export function openPopup(popup, closePopupByEsc, clickPopupHandler) {
  popup.classList.add("popup_is-opened");
  popup.addEventListener("click", clickPopupHandler);
  document.addEventListener("keydown", closePopupByEsc);
}

// Закрыть popup
export function closePopup(popup, closePopupByEsc, clickPopupHandler) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", clickPopupHandler);
  document.removeEventListener("keydown", closePopupByEsc);
}

// Закрыть popup ESCAPE
export function closePopupByEsc(evt) {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (evt.key === "Escape" && openedPopup) {
    closePopup(openedPopup);
  }
}

// Слушатель закрытия на popup
export function clickPopupHandler(evt) {
  if (
    evt.currentTarget === evt.target ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(evt.currentTarget);
  }
}

