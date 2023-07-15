let editBtn = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close-icon');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__item_el_name');
let jobInput = document.querySelector('.form__item_el_job');
let itemsInput = document.querySelectorAll('.form__item');
let profileName = document.querySelector('.profile__name'); 
let profileBio = document.querySelector('.profile__bio'); 
const container = document.querySelector('.cards');

function openPopup() {                     // Открытие попапа
  nameInput.value = profileName.textContent; // заполняем поля теми значениями что уже есть на странице
  jobInput.value = profileBio.textContent;
  popup.classList.add('popup_opened');
};
function closedPopup() {                    // Закрытие попапа
  popup.classList.remove('popup_opened');
};
function handleFormSubmit (evt) {            // Сохраниние введенных значений, на страницу
  evt.preventDefault(); 
  profileName.textContent = nameInput.value; 
  profileBio.textContent = jobInput.value;
  closedPopup();
};

formElement.addEventListener('submit', handleFormSubmit);
editBtn.addEventListener('click', openPopup);
closePopup.addEventListener('click', closedPopup);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



const renderCards = (card) => {
  const article = document.createElement('article')
  article.classList.add('card')

  const img = document.createElement('img')
  img.classList.add('card__image')
  img.src = card.link

  const div = document.createElement('div')
  div.classList.add('card__info')

  const h2 = document.createElement('h2')
  h2.classList.add('card__name')
  h2.textContent = card.name

  const button = document.createElement('button')
  button.classList.add('card__btn-like')

  div.append(h2, button)
  article.append(img, div)  

  return article
} 
initialCards.forEach((card) => {
  container.append(renderCards(card))
}
)