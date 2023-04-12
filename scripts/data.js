const profileTitle = document.querySelector('.profile__title'); 
const profileSubtitle = document.querySelector ('.profile__subtitle'); 
const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn')

const popupElements = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__cls-btn');
const profilePopupElement = document.querySelector('.profile-popup');
const popupInputNickname = document.querySelector('.popup__input_chg_nickname');
const popupInputActivity = document.querySelector('.popup__input_chg_activity');
const placePopupElement = document.querySelector('.place-popup');
const popupInputCaption = document.querySelector('.popup__input_chg_caption');
const popupInputUrl = document.querySelector('.popup__input_chg_url');
const formProfile = profilePopupElement.querySelector('.popup__form');
const formAddPlace = placePopupElement.querySelector('.popup__form');
const imagePopup = document.querySelector('.image-popup');
const imagePopupContanier = imagePopup.querySelector('.image-popup__contanier');
const imagePopupPicture = imagePopup.querySelector('.image-popup__picture');
const imagePopupCaption = imagePopup.querySelector('.image-popup__caption');

/*контент темплейта*/
const listElement = document.querySelector('.elements');
const cardElement = document.querySelector('#cardElement').content;

// переменные для сброса ошибок
const buttonSubmitFormDataElement = document.querySelector('.popup__sbt-btn');
const inputListFormDataElement = document.querySelector('.popup__input');
const buttonSubmitFormCardElement = document.querySelector('.popup__sbt-btn');
const inputListFormCardElement = document.querySelector('.popup__input');

// функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    //document.addEventListener('keydown', closePopupEscape)
}

// функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    //document.removeEventListener('keydown', closePopupEscape)
}

// закритие попапов при нажатии на эскейп
function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

// открытие попап редактирования профиля
editButton.addEventListener('click', () => {
    //resetErrorForm(formProfile);
    popupInputNickname.value = profileTitle.textContent;
    popupInputActivity.value = profileSubtitle.textContent;
    //toggleButtonState(inputListFormDataElement, buttonSubmitFormDataElement, internalValidation.disabledButtonClass)
    openPopup(profilePopupElement);
});

// открытие попап редактирования карточек
addButton.addEventListener('click', () => {
    //formAddPlace.reset();
    //resetErrorForm(formAddPlace);
    //toggleButtonState(inputListFormCardElement, buttonSubmitFormCardElement, internalValidation.disabledButtonClass)
    openPopup(placePopupElement);
})

// обработка сабмит для формы редактирования профиля
formProfile.addEventListener('submit', (evt) => {
    profileTitle.textContent = popupInputNickname.value;
    profileSubtitle.textContent = popupInputActivity.value;
    closePopup(profilePopupElement);
    evt.preventDefault();
});

// обработка сабмит для добавления карточки
formAddPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const itemName = {
    name:popupInputCaption.value,
    link:popupInputUrl.value
  };
  listElement.prepend(createPlace(itemName));
  closePopup(placePopupElement);
  /*обнуляет поля ввода*/
  evt.target.reset();
})

//закрыть любой попап на крестик
closeButtons.forEach((element) => {
  /*находим родитель с классом .попап */
    const closestPopup = element.closest('.popup');
    /* вешаем слушатель */
    element.addEventListener('click', () => {
        closePopup(closestPopup);
    });
});

//закрыть любой попап на оверлей
popupElements.forEach(element => element.addEventListener('click', closePopupOverlay))

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

/* массив Шесть карточек «из коробки» */
const initialCards = [
  { 
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/*создание карточек из массива*/
function createPlace(item) {
  const placeElement = cardElement.querySelector('.elements__list').cloneNode(true);
  const likeButton = placeElement.querySelector('.element__like');
  const trashButton = placeElement.querySelector('.element__trh-btn');
  const imageElement = placeElement.querySelector('.element__image');

  imageElement.src = item.link;
  imageElement.alt = item.name;
  placeElement.querySelector('.element__title').textContent = item.name;

  /*активный лайк*/
  likeButton.addEventListener('click', () => likeButton.classList.toggle('element__like_active'));
  /*удаление карточки при клике на мусорку*/
  trashButton.addEventListener('click', () => trashButton.closest('.elements__list').remove());
  /*открытие картинки в попапе при клике*/
  imageElement.addEventListener('click', () => openPicturePopup(item)); 
  return placeElement;
}

// создание начальных карточек
initialCards.forEach((item) => {
  listElement.append(createPlace(item));
})

 /*открытие картинки в попапе*/
 function openPicturePopup(item) {
    imagePopupPicture.src = item.link;
    imagePopupPicture.alt = item.name;
    imagePopupCaption.textContent = item.name;
    openPopup(imagePopup);
 }