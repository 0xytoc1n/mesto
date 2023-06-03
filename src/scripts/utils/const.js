/* массив Шесть карточек «из коробки» */
const initialCards = [
    { 
      caption: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      caption: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      caption: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      caption: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      caption: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      caption: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  const editButton = document.querySelector(".profile__edit-btn");
  const addButton = document.querySelector(".profile__add-btn");

  const cardSelectorTemplate = "#cardElement";

  const profilePopupElement = document.querySelector(".profile-popup");
  const placePopupElement = document.querySelector(".place-popup");

  const formProfile = profilePopupElement.querySelector(".popup__form");
  const formAddPlace = placePopupElement.querySelector(".popup__form");
  const popupProfileSelector = '.profile-popup';
  const popupAddPlaceSelector = '.place-popup';
  const popupImageSelector = '.image-popup';
  const listElementSelector = '.elements';

  const configInfo = {
    profileTitleSelector: '.profile__title',
    profileSubtitleSelector: '.profile__subtitle'
}

  const internalValidation = {
    errorTemplateSelector: ".popup__err_type_",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__sbt-btn",
    disabledButtonClass: "popup__sbt-btn_disabled",
    inputErrorClass: "popup__input_invalid",
    errorClass: "popup__err_visible",
  };
  
  export {
    initialCards,
    editButton,
    addButton,
    cardSelectorTemplate,
    formProfile,
    formAddPlace,
    popupProfileSelector,
    popupAddPlaceSelector,
    popupImageSelector,
    listElementSelector,
    configInfo,
    internalValidation,
  }