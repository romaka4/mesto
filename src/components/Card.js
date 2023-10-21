export class Card {
  constructor(cardData, myId, templateSelector, { setLike }, { removeLike }, { handleCardClick }, { handleDeleteClick })  {
    this.card = cardData;
    this._title = cardData.name;
    this._link = cardData.link;
    this._myId = myId;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;
    this._templateSelector = templateSelector;
    this._setLike = setLike;
    this._removeLike = removeLike;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._buttonDelete = document.querySelector('.card__delete');
  }
  _getTemplate() {
    this._element = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return this._element;
  }
  renderCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.card__image');
    this._name = this._element.querySelector('.card__name');
    this._likes = this._element.querySelector('.card__like-value');
    this._buttonDelete = this._element.querySelector('.card__delete');
    this._buttonLike = this._element.querySelector('.card__btn-like');
    this._image.src = this._link;
    this._image.alt = this._title;
    this._name.textContent = this._title;
    this._deletCard();
    this._setEventListeners();
    this.setCardLike(this.card);
    return this._element
  }
  _deletCard() {
    if (this._ownerId !== this._myId) {
      this._buttonDelete.classList.add('card__delete_hidden');
    } 
  }
  setCardLike(card) {
    this._like = card.likes;
    if (this._like.length === 0) {
      this._likes.textContent = '0';
    } else {
      this._likes.textContent = this._like.length;
    }  if (this._isLikedCard()) {
      this._buttonLike.classList.add('card__btn-like_active');
    } else {
      this._buttonLike.classList.remove('card__btn-like_active');
    }
  }
  _isLikedCard() {
    return this._like.some(like => 
      like._id === this._myId)
  }
  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._title, this._link);
    });
    this._element.querySelector('.card__btn-like').addEventListener('click', (evt) => {
      // evt.target.classList.toggle('card__btn-like_active');
      if (this._isLikedCard()) {
        this._removeLike(this._cardId)
      } else {
        this._setLike(this._cardId); 
      }
    });
    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteClick(this._cardId, this);
    })
  }
  removeCard() {
    this._element.remove();
  }
}