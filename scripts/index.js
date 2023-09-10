import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
export {closePopup, openPopup};
const editBtn = document.querySelector('.profile__edit-btn');
const popupEdit = document.querySelector('.popup_type_edit');
const formElementEdit = document.querySelector('.form-type-edit');
const nameInput = document.querySelector('.form__item_el_name');
const jobInput = document.querySelector('.form__item_el_job');
const profileName = document.querySelector('.profile__name'); 
const profileBio = document.querySelector('.profile__bio'); 
const container = document.querySelector('.cards');
const popupNewPlace = document.querySelector('.popup-new-place');
const placeAddBtn = document.querySelector('.profile__add-btn');
const titleInput = document.querySelector('.form__item_el_title');
const linkInput = document.querySelector('.form__item_el_link');
const formElementAdd = document.querySelector('.form-type-add');
const config = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_disabled',
  inputErrorClass: 'form__item_error',
  errorClass: 'input-error_active'
};
const initialCards = [
  {
    name: 'Animal', 
    link: 'https://proprikol.ru/wp-content/uploads/2020/09/kartinki-milyh-zhivotnyh-52.jpg'
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
// При вынесении константов в отдельный js файл, его нужно подключать как модуль(через импорт, экспорт) или также как мы делали раньше в предыдущих спринтах?
const closePopup = (elem) => {
  elem.classList.remove('popup_opened');
  document.removeEventListener('keyup', escClose);
};

const openPopup = (elem) => {
  elem.classList.add('popup_opened');
  document.addEventListener('keyup', escClose);
};

placeAddBtn.addEventListener('click', () => {
  openPopup(popupNewPlace);
  formElementAdd.reset();
  formAddValid.chekForm();
});

formElementEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value; 
  profileBio.textContent = jobInput.value;
  closePopup(popupEdit);
});

editBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
  formEditValid.chekForm();
  openPopup(popupEdit);
});

popupEdit.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__close-icon_type_edit') || (evt.target.classList.contains('popup_opened'))) {
    closePopup(popupEdit);
  }
});

formElementAdd.addEventListener('submit', createNewPlace);

function createNewPlace(evt) { 
  evt.preventDefault();
  closePopup(popupNewPlace);
  const cardData = {name: titleInput.value, link: linkInput.value}
  const element = new Card(cardData, '#card-template');
  const newCard = element.renderCard();
  container.prepend(newCard);
  formElementAdd.reset();
};
popupNewPlace.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__close-icon_type_add') || (evt.target.classList.contains('popup_opened'))) {
    closePopup(popupNewPlace);
  }
});

const escClose = (e) => {
  if (e.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  } 
}

const formAddValid = new FormValidator(config, formElementAdd);
formAddValid.enableValidation();
const formEditValid = new FormValidator(config, formElementEdit);
formEditValid.enableValidation();
initialCards.forEach((card) => { 
  const myCard = new Card(card, '#card-template')
  const cardElem = myCard.renderCard();
  container.append(cardElem);
});
