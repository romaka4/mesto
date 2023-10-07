import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor({popupSelector,  callback }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._inputList = Array.from(this._form.querySelectorAll('.form__item'));
    this._callback = callback;
  }
  setEventListeners() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._callback(this._getInputValues());
    })
    super.setEventListeners();
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
  close() {
    super.close();
    this._form.reset();
  }
}