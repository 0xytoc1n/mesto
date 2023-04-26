export default class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._errorTemplateSelector = config.errorTemplateSelector;
    this._disabledButtonClass = config.disabledButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._button = form.querySelector(this._submitButtonSelector);
    this._inputLists = form.querySelectorAll(this._inputSelector);
    this._form = form;
  }

  _hideInputError(errorElement, inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _showInputError(errorElement, inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hasInvalidInput() {
    return Array.from(this._inputLists).some(
      (inputElement) => !inputElement.validity.valid
    );
  }

  _disabledButton() {
    this._button.classList.add(this._disabledButtonClass);
    this._button.disabled = true;
  }

  _enableButton() {
    this._button.classList.remove(this._disabledButtonClass);
    this._button.disabled = false;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disabledButton(this._button);
    } else {
      this._enableButton();
    }
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._form.querySelector(
      `${this._errorTemplateSelector}${inputElement.id}`
    );
    if (inputElement.validity.valid) {
      this._hideInputError(errorElement, inputElement);
    } else {
      this._showInputError(errorElement, inputElement);
    }
  }

  _addEventListener() {
    this._inputLists.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._addEventListener();
  }

  resetValidation() {
    this._inputLists.forEach((inputElement) => {
      const errorTemplate = this._form.querySelector(
        `${this._errorTemplateSelector}${inputElement.id}`
      );
      if (!inputElement.validity.valid) {
        this._hideInputError(errorTemplate, inputElement);
      }
    });
    this._disabledButton();
  }
}
