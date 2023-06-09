import '../pages/index.css';
import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {
  initialCards,
  profileEditButton,
  profileAddButton,
  cardSelectorTemplate,
  formProfile,
  formAddPlace,
  popupProfileSelector,
  popupAddPlaceSelector,
  popupImageSelector,
  listElementSelector,
  configInfo,
  internalValidation,
} from "../utils/const.js";


const userInfo = new UserInfo(configInfo);

const popupPicture = new PopupWithImage(popupImageSelector);

function createNewCard(item) {
    const card = new Card(item, cardSelectorTemplate, popupPicture.open);
    return card.createCard();
}

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    section.addItem(createNewCard(item))
  }
}, listElementSelector);

section.renderItems();

const popupProfile = new PopupWithForm(popupProfileSelector, (inputValues) => {
  userInfo.setUserInfo(inputValues);
})

const popupAddPlace = new PopupWithForm(popupAddPlaceSelector, (inputValues) => {
  section.addItem(createNewCard(inputValues));
})

// открытие попап редактирования профиля
profileEditButton.addEventListener("click", () => {
  formProfileValidation.resetValidation();
  popupProfile.setInputValues(userInfo.getUserInfo())
  popupProfile.open()
});

// открытие попап редактирования карточек
profileAddButton.addEventListener("click", () => {
  formAddPlaceValidation.resetValidation();
  popupAddPlace.open()
});

const formProfileValidation = new FormValidator(internalValidation, formProfile);
formProfileValidation.enableValidation();

const formAddPlaceValidation = new FormValidator(internalValidation,formAddPlace);
formAddPlaceValidation.enableValidation();

popupPicture.setEventListeners();
popupProfile.setEventListeners();
popupAddPlace.setEventListeners();