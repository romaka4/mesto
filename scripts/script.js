const editBtn = document.querySelector('.profile__edit-btn');
const popupEdit = document.querySelector('.popup_type_edit');
const formElementEdit = document.querySelector('.form-type-edit');
const nameInput = document.querySelector('.form__item_el_name');
const jobInput = document.querySelector('.form__item_el_job');
const itemsInput = document.querySelectorAll('.form__item');
const profileName = document.querySelector('.profile__name'); 
const profileBio = document.querySelector('.profile__bio'); 
const container = document.querySelector('.cards');
const popupNewPlace = document.querySelector('.popup-new-place');
const placeAddBtn = document.querySelector('.profile__add-btn');
const template = document.querySelector('#card-template').content;
const titleInput = document.querySelector('.form__item_el_title');
const linkInput = document.querySelector('.form__item_el_link');
const formElementAdd = document.querySelector('.form-type-add');
const openPopupImage = document.querySelector('.popup-by-image');
const popupImage = document.querySelector('.popup__image');
const titleImage = document.querySelector('.popup__title-image');


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
  const submitButton = formElementAdd.querySelector(config.submitButtonSelector);
  disableButton(submitButton, config);
  const inputList = Array.from(formElementAdd.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElementAdd, inputElement, config);
}); // Вызываются конкретные функции, функционал проверен, все работает, смущает что код стал больше, надеюсь это нормально
});

formElementEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value; 
  profileBio.textContent = jobInput.value;
  closePopup(popupEdit);
});

editBtn.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
  const submitButton = formElementEdit.querySelector(config.submitButtonSelector);
  enableButton(submitButton, config);
  const inputList = Array.from(formElementEdit.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElementEdit, inputElement, config);
});
});
popupEdit.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__close-icon_type_edit') || (evt.target.classList.contains('popup_opened'))) {
    closePopup(popupEdit);
  }
})
popupNewPlace.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__close-icon_type_add') || (evt.target.classList.contains('popup_opened'))) {
    closePopup(popupNewPlace);
  }
})
openPopupImage.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__close-icon_type_image') || (evt.target.classList.contains('popup_opened'))) {
    closePopup(openPopupImage);
  }
})

const escClose = (e) => {
  if (e.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  } 
}
const createCard = (cardItems) => {
  const article = template.querySelector('.card').cloneNode(true);
  const cardImage = article.querySelector('.card__image');
  const cardName = article.querySelector('.card__name');

  cardName.textContent = cardItems.name;
  cardImage.src = cardItems.link;
  cardImage.alt = cardItems.name;

  article.querySelector('.card__btn-like').addEventListener('click', function(evt){
    evt.target.classList.toggle('card__btn-like_active');
  });
  article.querySelector('.card__delete').addEventListener('click', function (){
    article.remove();
  });
  cardImage.addEventListener('click', function(){
    openPopup(openPopupImage);
    popupImage.src = cardImage.src;
    titleImage.textContent = cardName.textContent;
    popupImage.alt = cardName.textContent;
  });

  return article;
};

initialCards.forEach((card) => {
  const myCard = createCard(card);
  container.append(myCard);
});

formElementAdd.addEventListener('submit', createNewPlace);

function createNewPlace(evt) {
  evt.preventDefault();
  closePopup(popupNewPlace);
  const element = ({name: titleInput.value, link: linkInput.value});
  const newCard = createCard(element);
  container.prepend(newCard);
  formElementAdd.reset();
  disableButton(evt.submitter, config);
};
const config = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_disabled',
  inputErrorClass: 'form__item_error',
  errorClass: 'input-error_active'
};

enableValidation(config);