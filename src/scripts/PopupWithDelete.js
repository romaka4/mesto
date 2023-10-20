import { Popup } from "./Popup.js";
export class PopupWithDelete extends Popup {
  constructor(popupSelector, {confirm}) {
    super(popupSelector);
    this._button = document.querySelector('.popup-by-delete-card__confirm');
    this._confirm = confirm;
  }

  setEventListeners() {
    super.open();
    super.setEventListeners();
    this._button.addEventListener('click', () =>{
      this._confirm();
      super.close();
      // api.delete()
      // this.deletCardServer();
    });
  }



}