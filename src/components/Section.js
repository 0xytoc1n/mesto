export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._items = items;
        this._renderer = renderer;
    }

    renderItems() {
        this._items.forEach(element => {
           this._renderer(element)
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }

}