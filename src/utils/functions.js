import { openPopupAdd, formAddValid, formElementAdd, formEditValid, popupProfile, userInfo, nameInput, jobInput } from "../pages/index.js";

export function openFormProfile() {
  const userValue = userInfo.getUserInfo();
  nameInput.value = userValue.name;
  jobInput.value = userValue.job;
  formEditValid.chekForm();
  popupProfile.open();
}
export function openFormCard() {
  openPopupAdd.open();
  formAddValid.chekForm();
  formElementAdd.reset();
}