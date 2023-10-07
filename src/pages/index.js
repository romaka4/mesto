import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { editBtn, formElementEdit, nameInput, jobInput,  placeAddBtn, formElementAdd, config, initialCards } from '../utils/constants.js';
import {  Section } from '../scripts/Section.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { UserInfo } from '../scripts/UserInfo.js';
import { openFormProfile, openFormCard } from '../utils/functions.js';
export { openPopupAdd, formAddValid, formElementAdd, formEditValid, popupProfile, userInfo, nameInput, jobInput };

const formAddValid = new FormValidator(config, formElementAdd);
formAddValid.enableValidation();
const formEditValid = new FormValidator(config, formElementEdit);
formEditValid.enableValidation();
const cardList = new Section({data: initialCards,  renderer: (item) => {
    const card = new Card (item, '#card-template', {handleCardClick: (evt) => { 
      const data = evt.target;
      popupImage.open(data);
    }});
    const cardElement = card.renderCard();
    cardList.addItem(cardElement);
    }
}, '.cards');

const popupImage = new PopupWithImage ('.popup-by-image'); 

const openPopupAdd = new PopupWithForm({popupSelector: '.popup-new-place', callback: (item) =>{
    const card = new Card (item, '#card-template', {handleCardClick: (evt) => { 
      const data = evt.target;
      popupImage.open(data);
    }
  });
    const cardElement = card.renderCard();
    cardList.addNewCard(cardElement);
    openPopupAdd.close();
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
openPopupAdd.setEventListeners();
cardList.rendererItems();