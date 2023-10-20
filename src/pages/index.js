import './index.css'; 
import { FormValidator } from '../scripts/FormValidator.js';
import { avatarBtn, formAvatar, editBtn, formElementEdit, nameInput, jobInput,  placeAddBtn, formElementAdd, config, saveBtn } from '../utils/constants.js';
import {  Section } from '../scripts/Section.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { UserInfo } from '../scripts/UserInfo.js';
import { openFormProfile, openFormCard, createCard, openFormAvatar } from '../utils/functions.js';
import { Api } from '../scripts/Api.js';
export { formAvatarValid, myId, popupAdd, formAddValid, formElementAdd, formEditValid, popupAvatar, popupProfile, userInfo, nameInput, jobInput, popupImage, api};

const formAddValid = new FormValidator(config, formElementAdd);
formAddValid.enableValidation();
const formEditValid = new FormValidator(config, formElementEdit);
formEditValid.enableValidation();
const formAvatarValid = new FormValidator(config, formAvatar);
formAvatarValid.enableValidation();
const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-77/',
  headers: {
    authorization: '5c05787c-aae6-42ac-a3d9-88173b538217',
    'Content-Type': 'application/json'
  }
})
function renderLoading(isLoading) {
  if (isLoading) {
    saveBtn.forEach((btn) =>{
      btn.textContent = 'Сохранение...';
    })
  } else {
    saveBtn.forEach((btn) =>{
      btn.textContent = 'Сохранить';
    })
  }
}
let myId;
Promise.all([api.getProfile(), api.getCards()])
.then(([result, cards]) => {
  myId = result._id;
  const info = { name: result.name, job: result.about};
  userInfo.setUserInfo(info);
  userInfo.setAvatar(result);
    cards.forEach((card) => {
    cardList.addItem(createCard(card));
  });
}).catch((error) => {
  console.error(`Ошибка получения данных с сервера: ${error}`);
})
const cardList = new Section('.cards');
const popupAdd = new PopupWithForm({popupSelector: '.popup-new-place', callback: (item) =>{
  renderLoading(true);
  api.post(item).then((card) =>{
    cardList.addNewCard(createCard(card));
  })
  .then(() => {
    popupAdd.close();
  })
  .catch((err) => {
    console.log(`${err}`)
  })
  .finally(() => {
    renderLoading(false);
  })
}});
const popupImage = new PopupWithImage ('.popup-by-image'); 
const userInfo = new UserInfo ({nameSelector: '.profile__name', infoUserSelector: '.profile__bio', avatarSelector: '.profile__image'});
const popupProfile = new PopupWithForm ({popupSelector: '.popup_type_edit', callback: (data) =>{
  renderLoading(true);
  userInfo.setUserInfo(data);
  api.patch(data)
  .then(() => {
    popupProfile.close();
  }).catch((err) => {
    console.log(`${err}`)
  })
  .finally(() => {
    renderLoading(false);
  })
}});
const popupAvatar = new PopupWithForm({popupSelector: '.popup-by-avatar', callback: (link) => {
  renderLoading(true);
  api.setAvatar(link).then((data) =>{
    userInfo.setAvatar(data);
  }).then(() => {
    popupAvatar.close();
  }).catch((err) => {
    console.log(`${err}`)
  })
  .finally(() => {
    renderLoading(false);
  })
}})
 
editBtn.addEventListener('click', openFormProfile);
placeAddBtn.addEventListener('click', openFormCard);
avatarBtn.addEventListener('click', openFormAvatar);
popupAvatar.setEventListeners();
popupProfile.setEventListeners();
popupImage.setEventListeners();
popupAdd.setEventListeners();

 