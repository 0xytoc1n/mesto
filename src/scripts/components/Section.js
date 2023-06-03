export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._items = items;
        this.renderer = renderer;
    }

    createPlace() {
        this._items.forEach(element => {
           this.addItem(this.renderer(element))
        });
    }

    addItem(element) {
        // this._container.prepend(this._renderer(element))
        this._container.prepend(element);
    }

}