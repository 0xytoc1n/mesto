const log = console.log;

const profileTitle = document.querySelector('.profile__title'); 
const profileSubtitle = document.querySelector ('.profile__subtitle'); 
const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn')

const popupElement = document.querySelectorAll('.popup');
const profilePopupElement = document.querySelector('.profile-popup');
const placePopupElement = document.querySelector('.place-popup');
const closeButton = document.querySelectorAll('.popup__cls-btn');
const formProfile = profilePopupElement.querySelector('.popup__form');
const formAddPlace = placePopupElement.querySelector('.popup__form');
const popupInputNickname = document.querySelector('.popup__input_chg_nickname');
const popupInputActivity = document.querySelector('.popup__input_chg_activity');
const popupInputCaption = formAddPlace.querySelector('.popup__input_chg_caption');
const popupInputUrl = formAddPlace.querySelector('.popup__input_chg_url');
const imagePopup = document.querySelector('.image-popup');
const imagePopupContanier = imagePopup.querySelector('.image-popup__contanier');
const imagePopupPicture = imagePopup.querySelector('.image-popup__picture');
const imagePopupCaption = imagePopup.querySelector('.image-popup__caption');

/*контент темплейта*/
const listElement = document.querySelector('.elements');
const cardElement = document.querySelector('#cardElement').content;

  function openPopup(y) {
    y.classList.add('popup_opened');
}

  function closePopup(y) {
    y.classList.remove('popup_opened');
}
/*заполнение формы редактирования профиля*/
editButton.addEventListener('click', () => {
    popupInputNickname.value = profileTitle.textContent;
    popupInputActivity.value = profileSubtitle.textContent;
    openPopup(profilePopupElement);
});

formProfile.addEventListener('submit', (evt) => {
    profileTitle.textContent = popupInputNickname.value;
    profileSubtitle.textContent = popupInputActivity.value;
    closePopup(profilePopupElement);
    evt.preventDefault();
});

/*закрыть любой попап*/ 
closeButton.forEach((x) => {
  /*находим родитель с классом .попап */
    const z = x.closest('.popup');
    /* вешаем слушатель */
    x.addEventListener('click', () => {
        closePopup(z);
    });
});

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

/*заполение формы создания карточки*/
addButton.addEventListener('click', () => {
  openPopup(placePopupElement);
})

/*создание карточек из массива*/
function createPlace(x) {
  const placeElement = cardElement.querySelector('.elements__list').cloneNode(true);
  const likeButton = placeElement.querySelector('.element__like');
  const trashButton = placeElement.querySelector('.element__trh-btn');
  const imageElement = placeElement.querySelector('.element__image');

  imageElement.src = x.link;
  imageElement.alt = x.name;
  placeElement.querySelector('.element__title').textContent = x.name;

  /*активный лайк*/
  likeButton.addEventListener('click', () => likeButton.classList.toggle('element__like_active'));
  /*удаление карточки при клике на мусорку*/
  trashButton.addEventListener('click', () => trashButton.closest('.elements__list').remove());
  /*открытие картинки в попапе*/
  imageElement.addEventListener('click', () => {
    openPicturePopup(x);
    openPopup(imagePopup);
  });
  return placeElement;
}

/* добавление карточки*/
initialCards.forEach((x) => {
  listElement.append(createPlace(x));
})

formAddPlace.addEventListener('submit', (evt) => {
  const xName = {
    name:popupInputCaption.value,
    link:popupInputUrl.value
  };
  listElement.prepend(createPlace(xName));
  evt.preventDefault();
  closePopup(placePopupElement);
  /*обнуляет поля ввода*/
  evt.target.reset();
})

 /*открытие картинки в попапе*/
 function openPicturePopup(x) {
    imagePopupPicture.src = x.link;
    imagePopupPicture.alt = x.name;
    imagePopupCaption.textContent = x.name;
    openPopup(imagePopup);
 }