const openPopupImage = document.querySelector('.popup-by-image');
const popupImage = document.querySelector('.popup__image');
const titleImage = document.querySelector('.popup__title-image');
import {closePopup, openPopup} from './index.js';
export class Card {
  constructor(cardData, templateSelector)  {
    this.name = cardData.name;
    this.link = cardData.link;
    this.templateSelector = templateSelector;
  }
  _getTemplate() {
    this._element = document.querySelector(this.templateSelector).content.querySelector('.card').cloneNode(true);
    return this._element;
  }
  renderCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__image').src = this.link;
    this._element.querySelector('.card__image').alt = this.name;
    this._element.querySelector('.card__name').textContent = this.name;
    this._setEventListeners();
    return this._element
  }
  _handleOpenPopup() {
    openPopup(openPopupImage);
    popupImage.src = this.link;
    titleImage.textContent = this.name;
    popupImage.alt = this.name;
  }
  _handleClosePopup(evt) {
    if (evt.target.classList.contains('popup__close-icon_type_image') || (evt.target.classList.contains('popup_opened'))) {
      closePopup(openPopupImage);
    }
  }
  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleOpenPopup()
    });
    openPopupImage.addEventListener('click', (evt) => {
      this._handleClosePopup(evt)
    });
    this._element.querySelector('.card__btn-like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__btn-like_active');
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._element.remove();
    });
  }
}