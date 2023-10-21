import { formAvatarValid, myId, api, popupAddCard, formAddValid, formElementAdd, formEditValid, popupProfile, userInfo, nameInput, jobInput, popupImage, popupAvatar} from "../pages/index.js";
import { Card } from '../components/Card.js';
import { PopupWithDelete } from "../components/PopupWithDelete.js";
import { saveBtn } from "./constants.js";
export const openFormProfile = () =>{
  const userValue = userInfo.getUserInfo();
  nameInput.value = userValue.name;
  jobInput.value = userValue.about;
  formEditValid.resetFormState();
  popupProfile.open();
}
export const openFormAvatar = () => {
  formAvatarValid.resetFormState();
  popupAvatar.open();
}
export const openFormCard = () => {
  formAddValid.resetFormState();
  formElementAdd.reset();
  popupAddCard.open();
}
export const createCard = (item, myId) => {
  const card = new Card (item, myId, '#card-template', {
    setLike: (cardId) => {
      api.setLike(cardId)
      .then((result) => {
        card.setCardLike(result);
      }).catch((err) => {
        console.log(`${err}`)
      })
    }
  }, 
  { removeLike: (cardId) => {
    api.removeLike(cardId)
    .then((result) => {
      card.setCardLike(result);
    }).catch((err) => {
      console.log(`${err}`)
    })
    }
  }, 
  { handleCardClick: (name, link) => { 
    popupImage.open(name, link); 
  }}, 
  {handleDeleteClick: (cardId, element) => {
    popupDelete.open(cardId, element)
  }});
  const cardElement = card.renderCard();
  return cardElement;
}
export const renderLoading = (isLoading) => {
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
export const popupDelete = new PopupWithDelete('.popup-by-delete-card', {
  confirm: (id, element) => {
    api.delete(id, element)
    .then(() => {
      element.removeCard();
      popupDelete.close();
    })
  }
});