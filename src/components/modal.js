import { 
  popupTypeImage
} from "./constans";

// Открытие popup image
export function openPopupImage(cardImageSrc, cardImageAlt) {
  openPopup(popupTypeImage);

  const popupImage = document.querySelector(".popup__image");
  popupImage.src = cardImageSrc;
  popupImage.alt = cardImageAlt;

  const popupCaption = document.querySelector(".popup__caption");
  popupCaption.textContent = cardImageAlt;
}
// Открытие popup
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  popup.addEventListener("click", clickPopupHandler);
  document.addEventListener("keydown", closePopupByEsc(popup));
}
function closePopupByEsc(popup) {
  return (evt) => {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  };
}
// Закрыть popup
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", clickPopupHandler);
  document.removeEventListener("keydown", closePopupByEsc(popup));
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
