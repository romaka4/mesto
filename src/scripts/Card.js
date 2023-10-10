export class Card {
  constructor(cardData, templateSelector, { handleCardClick })  {
    this._title = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    this._element = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return this._element;
  }
  createCard(item) {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.card__image');
    this._name = this._element.querySelector('.card__name');
    this._image.src = item.link;
    this._image.alt = item.name;
    this._name.textContent = item.name;
    this._setEventListeners();
    return this._element;
  }
  renderCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.card__image');
    this._name = this._element.querySelector('.card__name');
    this._image.src = this._link;
    this._image.alt = this._title;
    this._name.textContent = this._title;
    this._setEventListeners();
    return this._element
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._title, this._link);
    });
    this._element.querySelector('.card__btn-like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__btn-like_active');
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._element.remove();
    });
  }
}