let popup = document.querySelector('.popup');
let formElement = popup.querySelector ('.popup__form');
let nameInput = document.querySelector('.popup__input_change_nickname'); 
let activityInput = document.querySelector('.popup__input_change_activity');
let editButton = document.querySelector('.profile__edit-btn');
let profileTitle = document.querySelector('.profile__title'); 
let profileSubtitle = document.querySelector ('.profile__subtitle'); 
let closeButton = document.querySelector ('.popup__cls-btn');

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    activityInput.value = profileSubtitle.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = activityInput.value;
   
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
