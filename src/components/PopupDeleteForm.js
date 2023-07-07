import Popup from "./Popup.js";

export default class PopupDeleteForm extends Popup {
    constructor(popupSelector, functionSubmitForm) {
        super(popupSelector);
        this._functionSubmitForm = functionSubmitForm;
        this._submitButton = this._form.querySelector('.popup__sbt-btn');
        this._defaultTextButton = this._submitButton.textContent;

    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitButton.textContent = `Удаление...`
            this._functionSubmitForm({
                item: this._item,
                cardId: this._cardId,
            });
        });
    }

    open = ({item, cardId}) => {
        super.open();
        this._item = item;
        this._cardId = cardId;
    }

    resetDefaultTextDelete() {
        this._submitButton.textContent = this._defaultTextButton
    }
}