export class Section {
  constructor({data, renderer}, containerSelector){
    this._items = data;
    this._renderer = renderer;
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
  rendererItems() {
    this._items.forEach(item => {
      // console.log(item);
      this._renderer(item);
    });
  };
}