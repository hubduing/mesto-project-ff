// @todo: DOM узлы
const placeList = document.querySelector('.places__list');
const template = document.querySelector('#card-template').content;


// @todo: Темплейт карточки
function templateFunction(card) {
  const container = template.querySelector('.places__item');
  const cardTemplate = container.cloneNode(true);
  const buttonRemove = cardTemplate.querySelector('.card__delete-button');
  
  cardTemplate.querySelector('.card__title').textContent = card.name;
  cardTemplate.querySelector('.card__image').src = card.link;
   
  placeList.append(cardTemplate);

  buttonRemove.addEventListener('click', (event) => {
    return removeCard(event);
  });
}

// @todo: Функция создания карточки
function addCard() {
  
}
// @todo: Функция удаления карточки
function removeCard(event) {
  event.target.parentNode.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  templateFunction(card);
});