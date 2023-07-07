import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, functionSubmitForm) {
        super(popupSelector);
        this._functionSubmitForm = functionSubmitForm;
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._submitButton = this._form.querySelector('.popup__sbt-btn');
        this._defaultTextButton = this._submitButton.textContent;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            // this._submitButton.textContent = `${this._submitButton.textContent}...`
            this._submitButton.textContent = `Сохранение...`
            this._functionSubmitForm(this._getInputValues());
        });
    }

    _getInputValues() {
        this._values = {};
        this._inputList.forEach(element => {
            this._values[element.name] = element.value
        });

        return this._values
    }

    setInputValues(object) {
        this._inputList.forEach(element => {
            element.value = object[element.name];
        });
    }

    resetDefaultText() {
        this._submitButton.textContent = this._defaultTextButton
    }
  
    close() {
        super.close();
        this._form.reset();
    }
}