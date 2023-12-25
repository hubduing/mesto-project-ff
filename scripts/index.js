// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Темплейт карточки
function createCard(cardData, removeCard) {
  const container = cardTemplate.querySelector('.places__item');
  const card = container.cloneNode(true);
  const buttonRemove = card.querySelector('.card__delete-button');
  const cardImage = card.querySelector('.card__image');
  
  card.querySelector('.card__title').textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;

  buttonRemove.addEventListener('click', () => removeCard(card));
  
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