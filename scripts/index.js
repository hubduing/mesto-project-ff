// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Темплейт карточки
function createCard(cardArray, removeCard) {
  const container = cardTemplate.querySelector('.places__item');
  const card = container.cloneNode(true);
  const buttonRemove = card.querySelector('.card__delete-button');
  
  card.querySelector('.card__title').textContent = cardArray.name;
  card.querySelector('.card__image').src = cardArray.link;
  card.querySelector('.card__image').alt = cardArray.alt;

  buttonRemove.addEventListener('click', () => removeCard(buttonRemove.closest('.card')));

  return card;
}

// @todo: Функция удаления карточки
function removeCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardArray) => {
  let cardTemplate = createCard(cardArray, removeCard);
  cardsContainer.append(cardTemplate);
});