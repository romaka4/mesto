
export class UserInfo {
  constructor({nameSelector, infoUserSelector}) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(infoUserSelector);
  }
  getUserInfo () {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }
  setUserInfo(data) {
    this._name.textContent = data.name; 
    this._job.textContent = data.job;
  }
}
