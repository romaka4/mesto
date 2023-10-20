export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }
  getProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        Promise.reject(`Ошибка ${res.status}`);
      }
    })
  }
  getCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
      method: 'GET'
    }).then((res) =>{
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject(`Ошибка ${res.status}`);
      }
    })
  }
  post(item) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
      }).then((res) =>{
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject(`Ошибка ${res.status}`);
        }
      })
  }
  delete(cardId) {
    fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }
  
  patch(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    }).then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      Promise.reject(`Ошибка ${res.status}`);
    }
  })
}
  setLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        Promise.reject(`Ошибка ${res.status}`);
      }
    })
  }
  removeLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        Promise.reject(`Ошибка ${res.status}`);
      }
    })
  }
  setAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
      avatar: data.link
    })
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        Promise.reject(`Ошибка ${res.status}`);
      }
    })
  }
}
