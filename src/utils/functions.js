import { popupAdd, formAddValid, formElementAdd, formEditValid, popupProfile, userInfo, nameInput, jobInput, popupImage} from "../pages/index.js";
import { Card } from '../scripts/Card.js';

export const openFormProfile = () =>{
  const userValue = userInfo.getUserInfo();
  nameInput.value = userValue.name;
  jobInput.value = userValue.job;
  formEditValid.resetFormState();
  popupProfile.open();
}
export const openFormCard = () =>{
  popupAdd.open();
  formAddValid.resetFormState();
  formElementAdd.reset();
}
export const createCard = (item) =>{
  const card = new Card (item, '#card-template', {handleCardClick: (name, link) => { 
    popupImage.open(name, link); 
  }});
  const cardElement = card.renderCard();
  return cardElement;
}