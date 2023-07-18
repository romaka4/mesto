const editBtn = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const closePopup = document.querySelectorAll('.popup__close-icon')[0];
const formElement = document.querySelectorAll('.form')[0];
const nameInput = document.querySelector('.form__item_el_name');
const jobInput = document.querySelector('.form__item_el_job');
const itemsInput = document.querySelectorAll('.form__item');
const profileName = document.querySelector('.profile__name'); 
const profileBio = document.querySelector('.profile__bio'); 
const container = document.querySelector('.cards');
const popupNewPlace = document.querySelector('.popup-new-place');
const addBtn = document.querySelector('.profile__add-btn');
const closePopupAdd = document.querySelectorAll('.popup__close-icon')[1];
const template = document.querySelector('#card-template').content;
const titleInput = document.querySelector('.form__item_el_title');
const linkInput = document.querySelector('.form__item_el_link');
const createBtn = document.querySelectorAll('.form')[1];
const openPopupImage = document.querySelector('.popup-by-image');
const popupImage = document.querySelector('.popup__image');
const titleImage = document.querySelector('.popup__title-image');
const closeImageBtn = document.querySelectorAll('.popup__close-icon')[2];

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

function openPopup() {                     // Открытие попапа
  nameInput.value = profileName.textContent; // заполняем поля теми значениями что уже есть на странице
  jobInput.value = profileBio.textContent;
  popup.classList.add('popup_opened');
};
function closedPopup() {                    // Закрытие попапа
  popup.classList.remove('popup_opened');
  popupNewPlace.classList.remove('popup_opened');
  console.log('click');
};
function handleFormSubmit (evt) {            // Сохраниние введенных значений, на страницу
  evt.preventDefault(); 
  profileName.textContent = nameInput.value; 
  profileBio.textContent = jobInput.value;
  closedPopup();
};
function openPopupAdd() {                     // Открытие формы добавления карточки
  popupNewPlace.classList.add('popup_opened');
};

addBtn.addEventListener('click', openPopupAdd);
formElement.addEventListener('submit', handleFormSubmit);
editBtn.addEventListener('click', openPopup);
closePopup.addEventListener('click', closedPopup);
closePopupAdd.addEventListener('click', closedPopup);

const renderCards = (card) => {
const article = template.querySelector('.card').cloneNode(true);
const cardImage = article.querySelector('.card__image');
const cardName = article.querySelector('.card__name');
cardImage.src = card.link;
cardName.textContent = card.name;
container.append(article);
article.querySelector('.card__btn-like').addEventListener('click', function(evt){
  evt.target.classList.toggle('card__btn-like_active');
});
article.querySelector('.card__delete').addEventListener('click', function (){
 article.remove();
});
cardImage.addEventListener('click', function(){
  openPopupImage.classList.add('popup_opened');
  popupImage.src = cardImage.src;
  titleImage.textContent = cardName.textContent;
});
closeImageBtn.addEventListener('click', function(){
  openPopupImage.classList.remove('popup_opened');
  popupImage.src = '';
  titleImage.textContent = '';
  console.log('click');
});
}

initialCards.forEach((card) => {
  renderCards(card)
}
)
createBtn.addEventListener('submit', newPlace);
function newPlace(evt) {
  evt.preventDefault();
  const article = template.querySelector('.card').cloneNode(true);
  const cardImage = article.querySelector('.card__image');
  const cardName = article.querySelector('.card__name');
  cardImage.src = linkInput.value;
  cardName.textContent = titleInput.value;
  container.prepend(article);
  closedPopup();
  linkInput.value = '';
  titleInput.value = '';
  article.querySelector('.card__btn-like').addEventListener('click', function(evt){
    evt.target.classList.toggle('card__btn-like_active');
  });
  article.querySelector('.card__delete').addEventListener('click', function (){
    article.remove();
   });
   cardImage.addEventListener('click', function(){
    openPopupImage.classList.add('popup_opened');
    popupImage.src = cardImage.src;
    titleImage.textContent = cardName.textContent;
  });
  closeImageBtn.addEventListener('click', function(){
    openPopupImage.classList.remove('popup_opened');
    popupImage.src = '';
    titleImage.textContent = '';
  });
}
