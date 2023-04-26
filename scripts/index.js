import initialCards from "./const.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const editButton = document.querySelector(".profile__edit-btn");
const addButton = document.querySelector(".profile__add-btn");

const popupElements = document.querySelectorAll(".popup");
const closeButtons = document.querySelectorAll(".popup__cls-btn");
const profilePopupElement = document.querySelector(".profile-popup");
const popupInputNickname = document.querySelector(".popup__input_chg_nickname");
const popupInputActivity = document.querySelector(".popup__input_chg_activity");
const placePopupElement = document.querySelector(".place-popup");
const popupInputCaption = document.querySelector(".popup__input_chg_caption");
const popupInputUrl = document.querySelector(".popup__input_chg_url");
const formProfile = profilePopupElement.querySelector(".popup__form");
const formAddPlace = placePopupElement.querySelector(".popup__form");
const imagePopup = document.querySelector(".image-popup");
const imagePopupPicture = imagePopup.querySelector(".image-popup__picture");
const imagePopupCaption = imagePopup.querySelector(".image-popup__caption");

/*контент темплейта*/
const listElement = document.querySelector(".elements");
const cardSelectorTemplate = "#cardElement";

const internalValidation = {
  errorTemplateSelector: ".popup__err_type_",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__sbt-btn",
  disabledButtonClass: "popup__sbt-btn_disabled",
  inputErrorClass: "popup__input_invalid",
  errorClass: "popup__err_visible",
};

// функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEscape);
}

// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEscape);
}

// закритие попапов при нажатии на эскейп
function closePopupEscape(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

//закрыть любой попап на крестик
closeButtons.forEach((element) => {
  /*находим родитель с классом .попап */
  const closestPopup = element.closest(".popup");
  /* вешаем слушатель */
  element.addEventListener("click", () => {
    closePopup(closestPopup);
  });
});

//закрыть любой попап на оверлей
popupElements.forEach((element) =>
  element.addEventListener("click", closePopupOverlay)
);
function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

// открытие попап редактирования профиля
editButton.addEventListener("click", () => {
  formProfileValidation.resetValidation();
  popupInputNickname.value = profileTitle.textContent;
  popupInputActivity.value = profileSubtitle.textContent;
  openPopup(profilePopupElement);
});

// открытие попап редактирования карточек
addButton.addEventListener("click", () => {
  formAddPlace.reset();
  formAddPlaceValidation.resetValidation();
  openPopup(placePopupElement);
});

// обработка сабмит для формы редактирования профиля
formProfile.addEventListener("submit", (evt) => {
  profileTitle.textContent = popupInputNickname.value;
  profileSubtitle.textContent = popupInputActivity.value;
  closePopup(profilePopupElement);
  evt.preventDefault();
});

// обработка сабмит для добавления карточки
formAddPlace.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const itemName = {
    name: popupInputCaption.value,
    link: popupInputUrl.value,
  };
  addCard(listElement, createPlace(itemName));
  closePopup(placePopupElement);
  evt.target.reset();
});

/*открытие картинки в попапе*/
function openPicturePopup(item) {
  imagePopupPicture.src = item.link;
  imagePopupPicture.alt = item.name;
  imagePopupCaption.textContent = item.name;
  openPopup(imagePopup);
}

/*создание карточек из массива*/
function createPlace(item) {
  const card = new Card(item, cardSelectorTemplate, openPicturePopup);
  const cardElement = card.createCard();
  return cardElement;
}

// функция добавления карточки в контейнер
function addCard(contanier, card) {
  contanier.prepend(card);
}

// создание начальных карточек
initialCards.forEach((item) => {
  addCard(listElement, createPlace(item));
});

const formProfileValidation = new FormValidator(internalValidation, formProfile);
formProfileValidation.enableValidation();

const formAddPlaceValidation = new FormValidator(internalValidation,formAddPlace);
formAddPlaceValidation.enableValidation();
