import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, functionSubmitForm) {
        super( popupSelector );
        this._functionSubmitForm = functionSubmitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit' , this._functionSubmitForm)
        // this._form.addEventListener('submit', (evt) => {
        //     evt.preventDefault();
        //     this._functionSubmitForm(this._getInputValues());
        //     this.close();
        // });
    }

    getInputValues() {
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
  
    close() {
        super.close();
        this._form.reset();
    }
}