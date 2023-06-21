import '../pages/index.css';
import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDeleteForm from '../components/PopupDeleteForm';
import Api from '../components/Api';
import {
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
} from "../utils/const.js";

/*создание экземпляра класса UserInfo*/
const userInfo = new UserInfo(configInfo);

/*создание экземпляра класса PopupWithImage*/
const popupPicture = new PopupWithImage(popupImageSelector);

/*создание экземпляра класса PopupDeleteForm*/
const popupDeleteCard = new PopupDeleteForm(popupDeleteSelector, ({item, cardId}) => {
  api.deletCard(cardId)
  .then(() => {
    item.removeCard();
    popupDeleteCard.close()
  })
  .catch((error => console.error(`Ошибка удаления карточки ${error}`)))
  .finally(() => popupDeleteCard.resetDefaultTextDelete())
}
);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: '8a6d7fd2-63ec-4e44-9d7a-9d078cb068c9',
    'Content-Type': 'application/json'
  }
})

function createNewCard(item) {
    const card = new Card(item, cardSelectorTemplate, popupPicture.open, popupDeleteCard.open, (likeButton, cardId) => {
      if (likeButton.classList.contains('element__like_active')) {
        api.deleteLike(cardId)
          .then(res => {
            card.hangleLike(res.likes);
          })
        .catch((error => console.error(`Ошибка удаления лайка ${error}`)))

      } else {
        api.addLike(cardId) 
        .then(res => {
          card.hangleLike(res.likes);
        })
        .catch((error => console.error(`Ошибка добавления лайка ${error}`)))
      }     
    });
    return card.createCard();
}

/*создание экземпляра класса Section c обьектом начальных карточек, функцией создания разметки*/
const section = new Section((item) => {
  section.addItem(createNewCard(item))
}, listElementSelector);

/*создание экземпляра класса PopupWithForm для формы редактирования профиля*/
const popupProfile = new PopupWithForm(popupProfileSelector, (inputValues) => {
  api.editProfileInfo(inputValues)
  .then(res => {
    userInfo.setUserInfo({
      nickname: res.name,
      activity: res.about,
      avatar: res.avatar
    })
    popupProfile.close()
  })
  .catch((error => console.error(`Ошибка редактирования профиля ${error}`)))
  .finally(() => popupProfile.resetDefaultText())
})

/*создание экземпляра класса PopupWithForm для формы добавления карточек*/
const popupAddPlace = new PopupWithForm(popupAddPlaceSelector, (data) => {
  Promise.all([api.getInfo(),api.addCard(data)])
  /*деструкруризация */ /*полученную с сервера информауцию положить на страницу */
  .then(([dataUser, dataCard]) => { 
    dataCard.mineId = dataUser._id;
    section.addItem(createNewCard(dataCard))
    popupAddPlace.close()
  })
  .catch((error) => console.error(`Ошибка добавления данных на страницу ${error}`))
  .finally(() => popupAddPlace.resetDefaultText())
})

/*создание экземпляра класса PopupWithForm для формы добавления аватарки*/
const popupEditAvatar = new PopupWithForm(popupAvatarSelector, (data) => {
  api.editNewAvatar(data)
  .then(res => {
    userInfo.setUserInfo({
      nickname: res.name,
      activity: res.about,
      avatar: res.avatar
    })
    popupEditAvatar.close()
  })
  .catch((error => console.error(`Ошибка редактирования аватара профиля ${error}`)))
  .finally(() => popupEditAvatar.resetDefaultText())
})

/*открытие попапа редактирования профиля*/
profileEditButton.addEventListener("click", () => {
  forms.personalForm.resetValidation();
  popupProfile.setInputValues(userInfo.getUserInfo())
  popupProfile.open()
});

/*открытие попапа редактирования карточек*/
profileAddButton.addEventListener("click", () => {
  forms.addPlace.resetValidation();
  popupAddPlace.open()
});

/*окрытие попапа редактирования аватарки*/
profileAvatarOverlay.addEventListener('click', () => {
  forms.editAvatar.resetValidation();
  popupEditAvatar.open();
})

/*создание экземпляра класса FormValidator для любой фоомы со страницы с активной валидацией*/
Array.from(document.forms).forEach(item => {
  const form = new FormValidator(internalValidation, item);
  const name = item.getAttribute('name');
  forms[name] = form;
  form.enableValidation()
})

/*слушатели клика закрытия по оверлею и крестику*/
popupPicture.setEventListeners();
popupProfile.setEventListeners();
popupAddPlace.setEventListeners();
popupEditAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

/*массив асинхронных методов создания карточек при загрузке страницы*/
Promise.all([api.getInfo(),api.getCards()])
  /*деструкруризация */ /*полученную с сервера информауцию положить на страницу */
  .then(([dataUser, dataCard]) => { 
    dataCard.forEach(element => element.mineId = dataUser._id)
    userInfo.setUserInfo({
      nickname: dataUser.name,
      activity: dataUser.about,
      avatar: dataUser.avatar
    })
    section.renderItems(dataCard.reverse());
  })
  .catch((error) => console.error(`Ошибка создания начальных данных ${error}`))