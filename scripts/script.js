const editBtn = document.querySelector('.profile__edit-btn');
const popupEdit = document.querySelector('.popup_type_edit');
const closePopupEdit = document.querySelector('.popup__close-icon_type_edit');
const formElementEdit = document.querySelector('.form-type-edit');
const nameInput = document.querySelector('.form__item_el_name');
const jobInput = document.querySelector('.form__item_el_job');
const itemsInput = document.querySelectorAll('.form__item');
const profileName = document.querySelector('.profile__name'); 
const profileBio = document.querySelector('.profile__bio'); 
const container = document.querySelector('.cards');
const popupNewPlace = document.querySelector('.popup-new-place');
const placeAddBtn = document.querySelector('.profile__add-btn');
const closePopupAdd = document.querySelector('.popup__close-icon_type_add');
const template = document.querySelector('#card-template').content;
const titleInput = document.querySelector('.form__item_el_title');
const linkInput = document.querySelector('.form__item_el_link');
const formElementAdd = document.querySelector('.form-type-add');
const openPopupImage = document.querySelector('.popup-by-image');
const popupImage = document.querySelector('.popup__image');
const titleImage = document.querySelector('.popup__title-image');
const closePopupImageBtn = document.querySelector('.popup__close-icon_type_image');


const closePopup = (elem) => {
  elem.classList.remove('popup_opened');
  document.removeEventListener('keyup', escClose);
};

const openPopup = (elem) => {
  elem.classList.add('popup_opened');
  document.addEventListener('click', overlayClose);
  document.addEventListener('keyup', escClose);
};

placeAddBtn.addEventListener('click', () => {
  openPopup(popupNewPlace);
  formElementAdd.reset(); 
  enableValidation(config);
});

formElementEdit.addEventListener('submit', (evt) => {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value; 
  profileBio.textContent = jobInput.value;
  closePopup(popupEdit);
});

editBtn.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent; // заполняем поля теми значениями что уже есть на странице
  jobInput.value = profileBio.textContent;
  enableValidation(config);
});

closePopupEdit.addEventListener('click', () => {
  closePopup(popupEdit);
});

closePopupAdd.addEventListener('click', () => {
  closePopup(popupNewPlace);
});

closePopupImageBtn.addEventListener('click', () => {
  closePopup(openPopupImage);
});

const escClose = (e) => {
  if (e.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  } 
}
const overlayClose = (e) => {
  const popupOpened = document.querySelector('.popup_opened');
  if (e.target === popupOpened) {
    closePopup(popupOpened);
  };
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
  enableValidation(config);
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