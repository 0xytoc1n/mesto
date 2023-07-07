export default class Card {
    constructor(item, cardSelectorTemplate, openPicturePopup, openDeleteCard, shiftLike ) {
      this._item = item;
      this._link = item.link;
      this._name = item.name;
      this._mineId = item.mineId;
      this._ownerId = item.owner._id;
      this._likes = item.likes;
      this._likesSum = item.likes.length;
      this._cardId = item._id;
      this._cardSelectorTemplate = cardSelectorTemplate;
      this._openPicturePopup = openPicturePopup;
      this._openDeleteCard = openDeleteCard;
      this._shiftLike = shiftLike;
      this._isLike = false;
      this._cloneElement = document.querySelector(this._cardSelectorTemplate).content.querySelector('.elements__list').cloneNode(true);
      this._imageElement = this._cloneElement.querySelector('.element__image');
      this._likeButton = this._cloneElement.querySelector('.element__like');
      this._trashButton = this._cloneElement.querySelector('.element__trh-btn');
      this._title = this._cloneElement.querySelector('.element__title');
      this._counter= this._cloneElement.querySelector('.element__counter');
    }
  
    _toggleLike = () => {
      this._shiftLike(this._isLike, this._cardId)
  }
  
    _deleteTrash = () => {
      this._openDeleteCard({
        item:this, 
        cardId:this._cardId
      });
    }
  
    _openImagePopup = () => {
      this._openPicturePopup(this._item)
    }
  
    _addEventListener() {
      this._likeButton.addEventListener('click', this._toggleLike);
      this._trashButton.addEventListener('click', this._deleteTrash);
      this._imageElement.addEventListener('click', this._openImagePopup);
  }

    _checkNumberLikes() {
      this._likes.forEach(element => {
        if (element._id === this._mineId) {
          this._isLike = true;
          this._likeButton.classList.add('element__like_active')
          return
        }
      })
      this._counter.textContent = this._likesSum;
    }

    _makeTrashInvisible() {
      this._mineId === this._ownerId ? this._trashButton.style.display = 'block' : this._trashButton.style.display = 'none';
    }
  
    removeCard() {
      this._cloneElement.remove();
      this._cloneElement = null;
    }

    createCard() {
      this._imageElement.src = this._link;
      this._imageElement.alt = this._name;
      this._title.textContent = this._name;
      this._checkNumberLikes();
      this._makeTrashInvisible();
      this._addEventListener();
      return this._cloneElement;
  }

    hangleLike(likes) {
      this._likeButton.classList.toggle('element__like_active');
      this._counter.textContent = likes.length
      this._isLike = !this._isLike;
    }
  };