import './index.css'; 
import { FormValidator } from '../components/FormValidator.js';
import { avatarBtn, formAvatar, editBtn, formElementEdit, nameInput, jobInput,  placeAddBtn, formElementAdd, config } from '../utils/constants.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { openFormProfile, openFormCard, createCard, openFormAvatar, renderLoading, popupDelete } from '../utils/functions.js';
import { Api } from '../components/Api.js';
export { popupDelete, formAvatarValid, myId, popupAddCard, formAddValid, formElementAdd, formEditValid, popupAvatar, popupProfile, userInfo, nameInput, jobInput, popupImage, api};

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

let myId;
Promise.all([api.getProfile(), api.getCards()])
.then(([result, cards]) => {
  myId = result._id;
  console.log(myId); 
  const info = { name: result.name, about: result.about};
  userInfo.setUserInfo(info);
  userInfo.setAvatar(result);
  cardList.rendererItems(cards, myId);
})

const cardList = new Section({renderer: (item, myId) =>{
  cardList.addItem(createCard(item, myId));
}},'.cards');

const popupAddCard = new PopupWithForm({popupSelector: '.popup-new-place', callback: (item) =>{
  renderLoading(true);
  api.post(item).then((card) =>{
    console.log(myId);
    cardList.addNewCard(createCard(card, myId));
  })
  .then(() => {
    popupAddCard.close();
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
  // userInfo.setUserInfo(data);
  api.patch(data)
  .then((data) => {
    userInfo.setUserInfo(data);
    console.log(data)
  })
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
popupAddCard.setEventListeners();
popupDelete.setEventListeners();
 