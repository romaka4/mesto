export class Card {
  constructor(cardData, templateSelector, { handleCardClick })  {
    this.name = cardData.name;
    this.link = cardData.link;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  }
  _getTemplate() {
    this._element = document.querySelector(this.templateSelector).content.querySelector('.card').cloneNode(true);
    return this._element;
  }
  renderCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.card__image');
    this._name = this._element.querySelector('.card__name');
    this._image.src = this.link;
    this._image.alt = this.name;
    this._name.textContent = this.name;
    this._setEventListeners();
    return this._element
  }

  _setEventListeners() {
    this._image.addEventListener('click', (evt) => {
      this.handleCardClick(evt);
    });
    this._element.querySelector('.card__btn-like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__btn-like_active');
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._element.remove();
    });
  }
}