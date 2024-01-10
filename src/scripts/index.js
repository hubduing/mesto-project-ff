import "../pages/index.css";
import initialCards from "./cards.js";

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const arrPopup = document.querySelectorAll(".popup");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__description');
const popupForm = document.forms.edit_profile;
const name = popupForm.elements.name;
const description = popupForm.elements.description;
const newPlace = document.forms['new-place'];
const popupArray = document.querySelectorAll('.popup');


// @todo: Темплейт карточки
function createCard(cardData, removeCard) {
  const container = cardTemplate.querySelector(".places__item");
  const card = container.cloneNode(true);
  const buttonRemove = card.querySelector(".card__delete-button");
  const cardImage = card.querySelector(".card__image");
  const cardLikeButton = card.querySelector('.card__like-button');

  card.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;

  buttonRemove.addEventListener("click", () => removeCard(card));

  // Кнопка Like в карточках
  cardLikeButton.addEventListener('click', () => {
    cardLikeButton.classList.toggle('card__like-button_is-active');
  })

  // popup image
  cardImage.addEventListener("click", () => {
    openPopupImage(cardImage.src, cardImage.alt)
  })


  return card;
}

// @todo: Функция удаления карточки
function removeCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  let cardTemplate = createCard(cardData, removeCard);
  cardsContainer.append(cardTemplate);
});

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

// Открытие popup image
function openPopupImage(cardImageSrc, cardImageAlt){
  openPopup(popupTypeImage)
  
  if (popupTypeImage.classList.contains('popup_is-opened')) {
    const popupImage = document.querySelector('.popup__image')
    popupImage.src = cardImageSrc;
    popupImage.alt = cardImageAlt;
  }

  const popupCaption = document.querySelector('.popup__caption');
  popupCaption.textContent = cardImageAlt;
}

// Открытие popup
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  popup.addEventListener("click", clickHandler);
  document.addEventListener("keydown", function keyHandler(evt) {
    if (evt.key === "Escape") {
      closePopup(popup);
    } 
  });
}

// Закрыть popup
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", clickHandler);
  document.removeEventListener("keydown", function keyHandler() {});
}

// Слушатель закрытия на popup
function clickHandler(evt) {
  arrPopup.forEach((popup) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
}

// Сохранение информации о пользователе
function handleFormSubmit(evt) {
  evt.preventDefault();
  
  nameInput.textContent = name.value;
  jobInput.textContent = description.value;
  closePopup(popupTypeEdit)
}

// Добавление новой карточки
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const name = newPlace.elements['place-name'].value;
  const url = newPlace.elements.link.value;
  const alt = '';
  let tempObject = {
    name,
    url,
    alt
  };
  initialCards.unshift(tempObject);
  let cardTemplate = createCard(initialCards[0], removeCard);
  cardsContainer.prepend(cardTemplate);

  newPlace.reset();
  closePopup(popupTypeNewCard);
}


popupForm.addEventListener('submit', handleFormSubmit); 
newPlace.addEventListener('submit', handleFormSubmitCard);