import { formAvatarValid, myId, api, popupAdd, formAddValid, formElementAdd, formEditValid, popupProfile, userInfo, nameInput, jobInput, popupImage, popupAvatar} from "../pages/index.js";
import { Card } from '../scripts/Card.js';
import { PopupWithDelete } from "../scripts/PopupWithDelete.js";

export const openFormProfile = () =>{
  const userValue = userInfo.getUserInfo();
  nameInput.value = userValue.name;
  jobInput.value = userValue.job;
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
  popupAdd.open();
}
export const createCard = (item) => {
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
  }}, {handleDeleteClick: (cardId) => {
    const popupDelete = new PopupWithDelete('.popup-by-delete-card', { confirm: () => {
      api.delete(cardId);
      card.removeCard();
    }})
    popupDelete.setEventListeners();
  }});
  const cardElement = card.renderCard();
  return cardElement;
}