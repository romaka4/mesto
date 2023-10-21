import { Popup } from "./Popup.js";
export class PopupWithDelete extends Popup {
  constructor(popupSelector, { confirm }) {
    super(popupSelector);
    this._button = document.querySelector('.popup-by-delete-card__confirm');
    this._confirm = confirm;
  }
  open(cardId, element) {
    super.open();
    this.cardId = cardId;
    this.element = element;
  }
  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', () =>{
      this._confirm(this.cardId, this.element);
    });
  }



}