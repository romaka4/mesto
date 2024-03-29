export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }
  _checkResponce(res) {
    if (res.ok) {
      return res.json()
    } else {
      Promise.reject(`Ошибка ${res.status}`);
    }
  }
  
  getProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((this._checkResponce)) 
  }
  getCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
      method: 'GET'
    }).then((this._checkResponce)) 
  }
  post(item) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    }).then((this._checkResponce)) 
  }
  
  delete(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then((this._checkResponce)) 
  }
  patch(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    }).then((this._checkResponce)) 
  }

  setLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then((this._checkResponce)) 
  }

  removeLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then((this._checkResponce)) 
  }
  setAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link
      })
    }).then((this._checkResponce)) 
  }
}