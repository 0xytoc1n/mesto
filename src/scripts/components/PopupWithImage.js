import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPicture = this._popup.querySelector('.image-popup__picture');
        this._popupPictureCaption = this._popup.querySelector('.image-popup__caption');
    }

    open = (item) => {
        this._popupPicture.src = item.link;
        this._popupPicture.alt = item.caption;
        this._popupPictureCaption.textContent = item.caption;
        super.open()
    }

}