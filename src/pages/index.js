import '../pages/index.css';
import Card from "../scripts/components/Сard.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import {
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
} from "../scripts/utils/const.js";


const userInfo = new UserInfo(configInfo);

const popupPicture = new PopupWithImage(popupImageSelector);


const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardSelectorTemplate, popupPicture.open);
    return card.createCard();
  }
}, listElementSelector);

section.createPlace();

const popupProfile = new PopupWithForm(popupProfileSelector, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(popupProfile.getInputValues())
  popupProfile.close();
})


const popupAddPlace = new PopupWithForm(popupAddPlaceSelector, (evt) => {
  evt.preventDefault();
  section.addItem(section.renderer(popupAddPlace.getInputValues()));
  popupAddPlace.close();
})

// открытие попап редактирования профиля
editButton.addEventListener("click", () => {
  formProfileValidation.resetValidation();
  popupProfile.setInputValues(userInfo.getUserInfo())
  popupProfile.open()
});

// открытие попап редактирования карточек
addButton.addEventListener("click", () => {
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


// Array.from(document.forms).forEach(item => {
//   const form = new FormValidator(internalValidation, item)
//   const name = item.name;
//   formsValidator[name] = form;
//   form.enableValidation()
// })