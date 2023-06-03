export default class Card {
    constructor(item, cardSelectorTemplate, openPicturePopup) {
      this._item = item;
      this._link = item.link;
      this._name = item.caption;
      this._cardSelectorTemplate = cardSelectorTemplate;
      this._openPicturePopup = openPicturePopup;
    }
  
    _makeCards() {
      return document.querySelector(this._cardSelectorTemplate).content.querySelector('.elements__list').cloneNode(true)
    }
  
    _toggleLike = () => {
      this._likeButton.classList.toggle('element__like_active');
  }
  
    _deleteTrash = () => {
      this._cloneElement.remove();
      this._cloneElement = null;
    }
  
    _openImagePopup = () => {
      this._openPicturePopup(this._item)
    }
  
    _addEventListener() {
      this._likeButton.addEventListener('click', this._toggleLike);
      this._trashButton.addEventListener('click', this._deleteTrash);
      this._imageElement.addEventListener('click', this._openImagePopup);
  }
  
    createCard() {
      this._cloneElement = this._makeCards();
      this._imageElement = this._cloneElement.querySelector('.element__image');
      this._likeButton = this._cloneElement.querySelector('.element__like');
      this._trashButton = this._cloneElement.querySelector('.element__trh-btn');
      this._title = this._cloneElement.querySelector('.element__title');
      this._imageElement.src = this._link;
      this._imageElement.alt = this._name;
      this._title.textContent = this._name;
      this._addEventListener()
      return this._cloneElement
  }
  };