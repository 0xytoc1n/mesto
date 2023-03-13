let page = document.querySelector('.page')
let popup = page.querySelector('.popup')
// Находим форму в DOM

// Находим поля формы в DOM
let formElement = popup.querySelector ('.popup__form')
let nameInput = document.querySelector('.popup__input_change_nickname')
let activityInput = document.querySelector('.popup__input_change_activity')
let profile = document.querySelector('.profile__info')
let editButton = document.querySelector('.profile__edit-btn')
let profileTitle = document.querySelector('.profile__title')
let profileSubtitle = document.querySelector ('.profile__subtitle')
let closeButton = document.querySelector ('.popup__cls-btn')

function openPopup() {
    popup.classList.add('popup__opened');
    nameInput.value = profileTitle.textContent;
    activityInput.value = profileSubtitle.textContent;
}

function closePopup() {
    popup.classList.remove('popup__opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

// Обработчик «отправки» формы
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
   
    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = activityInput.value;
    // Вставьте новые значения с помощью textContent
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
