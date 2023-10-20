export class Section {
  constructor(containerSelector){
    this._container = document.querySelector(containerSelector);
  };
  addItem(element) {
    this._container.append(element);
  };
  clear() {
    this._container.innerHTML = '';
  }
  addNewCard(element) {
    this._container.prepend(element);
  }
}