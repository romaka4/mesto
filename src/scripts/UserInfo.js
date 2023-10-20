export class UserInfo {
  constructor({nameSelector, infoUserSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(infoUserSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo () {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }
  setAvatar(data) {
    this._avatar.style.backgroundImage = `url(${data.avatar})`;
  }
  setUserInfo(data) {
    this._name.textContent = data.name; 
    this._job.textContent = data.job;
  }
}
