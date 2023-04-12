// включение валидации вызовом enableValidation
// все настройки передаются при вызове
 
  const internalValidation = {
    formSelector: document.forms,
    errorTemplateSelector: '.popup__err_type_',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__sbt-btn',
    disabledButtonClass: 'popup__sbt-btn_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__err_visible'
  };
  console.log('.popup__err_visible');

  function enableValidation(item) {
    const forms = Array.from(item.formSelector);
    forms.forEach((formElement) => {
        const inputLists = formElement.querySelectorAll(item.inputSelector)
        const button = formElement.querySelector(item.submitButtonSelector)
        setEventListener(inputLists, button,
            item.errorTemplateSelector,
            item.disabledButtonClass,
            item.inputErrorClass, 
            item.errorClass);
    });
  };
  
  function setEventListener(inputLists,button, 
    errorTemplateSelector,disabledButtonClass, inputErrorClass, errorClass) {
    inputLists.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(inputElement, errorTemplateSelector, inputErrorClass, errorClass)
            toggleButtonState(inputLists, button, disabledButtonClass)
        });
    });
  }

//показ и скрытие ошибок в зависимости от валидности инпутов
  function checkInputValidity(inputElement, errorTemplateSelector, inputErrorClass, errorClass) {
    const errorElement = document.querySelector(`${errorTemplateSelector}${inputElement.id}`)
    if (inputElement.validity.valid) {
        hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
      } else {
        showInputError(inputElement, errorElement, inputErrorClass, errorClass);
      }
  }
// функция показа ошибки
  function showInputError(inputElement, errorElement, inputErrorClass, errorClass) {
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = inputElement.errorMessage;
  }
// функция скрывающая ошибку
  function hideInputError(inputElement, errorElement, inputErrorClass, errorClass) {
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }

// функция сброса ошибок валидации при открытии
  function resetErrorForm(form) {
    form.querySelectorAll(internalValidation.inputSelector).forEach((inputElement) => {
        const errorTemplate = document.querySelector(`${internalValidation.errorTemplateSelector}${inputElement.id}`);
        if (!inputElement.validity.valid) {
            hideInputError(inputElement, errorTemplate, internalValidation.inputErrorClass, internalValidation.errorClass);
          } 
    });
  }

// кликабельная кнопка
  function enableButton(button, disabledButtonClass) {
    button.classList.remove(disabledButtonClass);
    button.disabled = false;
  }

// некликабельная кнопка
  function disabledButton(button, disabledButtonClass) {
    button.classList.add(disabledButtonClass);
    button.disabled = true;
  }

// валидность инпутов и стилизация кнопок 
  function toggleButtonState(inputLists, button, disabledButtonClass) {
    if (hasInvalidInput(inputLists)) {
        disabledButton(button, disabledButtonClass);
      } else {
        enableButton(button, disabledButtonClass);
      };
 }

// возвращение невалидных импутов
  function hasInvalidInput(inputLists) {
    return Array.from(inputLists).some((inputElement) => !inputElement.validity.valid)
 }

 enableValidation(internalValidation);
 