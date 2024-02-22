// Открытие popup
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
}

// Закрыть popup
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

// Закрыть popup ESCAPE
function closePopupByEsc(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
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

