const arrPopup = document.querySelectorAll(".popup");
const popupTypeImage = document.querySelector(".popup_type_image");

// Открытие popup image
export function openPopupImage(cardImageSrc, cardImageAlt) {  
  openPopup(popupTypeImage);

  if (popupTypeImage.classList.contains("popup_is-opened")) {
    const popupImage = document.querySelector(".popup__image");
    popupImage.src = cardImageSrc;
    popupImage.alt = cardImageAlt;
  }

  const popupCaption = document.querySelector(".popup__caption");
  popupCaption.textContent = cardImageAlt;
}
// Открытие popup
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  popup.addEventListener("click", clickHandler);
  document.addEventListener("keydown", function keyHandler(evt) {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  });
}

// Закрыть popup
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", clickHandler);
  document.removeEventListener("keydown", function keyHandler() {});
}

// Слушатель закрытия на popup
export function clickHandler(evt) {
  arrPopup.forEach((popup) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
}
