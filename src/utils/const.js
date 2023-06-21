/* массив Шесть карточек «из коробки» */
  const profileEditButton = document.querySelector(".profile__edit-btn");
  const profileAddButton = document.querySelector(".profile__add-btn");
  const profileAvatarOverlay = document.querySelector('.profile__avatar-overlay');

  const cardSelectorTemplate = "#cardElement";

  const popupProfileSelector = '.profile-popup';
  const popupAddPlaceSelector = '.place-popup';
  const popupImageSelector = '.image-popup';
  const listElementSelector = '.elements';

  const popupAvatarSelector = '.edit-avatar';
  const popupDeleteSelector = '.card-delete';

  const forms = {};
  
  const configInfo = {
    profileTitleSelector: '.profile__title',
    profileSubtitleSelector: '.profile__subtitle',
    profileAvatar: '.profile__avatar'
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
    profileEditButton,
    profileAddButton,
    profileAvatarOverlay,
    cardSelectorTemplate,
    popupProfileSelector,
    popupAddPlaceSelector,
    popupImageSelector,
    listElementSelector,
    popupAvatarSelector,
    popupDeleteSelector,
    forms,
    configInfo,
    internalValidation,
  }