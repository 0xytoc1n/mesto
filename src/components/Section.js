export default class Section {
    constructor(renderer, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    renderItems(cardData) {
        cardData.forEach(element => {
           this._renderer(element)
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }

}