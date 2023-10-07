export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  };
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }
  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }
  setEventListeners() {
    this._popup.addEventListener('click', (evt) =>{
      if (evt.target.classList.contains('popup__close-icon') || (evt.target.classList.contains('popup_opened'))) {
        this.close();
      }
    })
  }
}

