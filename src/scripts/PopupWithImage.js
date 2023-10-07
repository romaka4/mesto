import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupTitle = this._popup.querySelector('.popup__title-image');
  }
  open(data) {
    this._popupImage.src = data.src;
    this._popupImage.alt = data.alt;
    this._popupTitle.textContent = data.alt;
    super.open();
  }
}