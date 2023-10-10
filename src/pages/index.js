import './index.css'; 
import { FormValidator } from '../scripts/FormValidator.js';
import { editBtn, formElementEdit, nameInput, jobInput,  placeAddBtn, formElementAdd, config, initialCards } from '../utils/constants.js';
import {  Section } from '../scripts/Section.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { UserInfo } from '../scripts/UserInfo.js';
import { openFormProfile, openFormCard, createCard } from '../utils/functions.js';
export { popupAdd, formAddValid, formElementAdd, formEditValid, popupProfile, userInfo, nameInput, jobInput, popupImage};

const formAddValid = new FormValidator(config, formElementAdd);
formAddValid.enableValidation();
const formEditValid = new FormValidator(config, formElementEdit);
formEditValid.enableValidation();

const cardList = new Section({data: initialCards,  renderer: (item) => {
  cardList.addItem(createCard(item));
  }
}, '.cards');

const popupImage = new PopupWithImage ('.popup-by-image'); 
const popupAdd = new PopupWithForm({popupSelector: '.popup-new-place', callback: (item) =>{
  cardList.addNewCard(createCard(item));
  popupAdd.close();
}
});
const userInfo = new UserInfo ({nameSelector: '.profile__name', infoUserSelector: '.profile__bio'});
const popupProfile = new PopupWithForm ({popupSelector: '.popup_type_edit', callback: (data) =>{
  userInfo.setUserInfo(data);
  popupProfile.close();
}
});

editBtn.addEventListener('click', openFormProfile);
placeAddBtn.addEventListener('click', openFormCard);

popupProfile.setEventListeners();
popupImage.setEventListeners();
popupAdd.setEventListeners();
cardList.rendererItems(); 