export class Section {
  constructor({ renderer }, containerSelector){
    this.renderer = renderer;
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
  rendererItems(cards, myId) { 
    cards.forEach(item => {
      this.renderer(item, myId); 
    }); 
  } 
}
