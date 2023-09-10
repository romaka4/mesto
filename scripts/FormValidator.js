export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
  }
  _checkInput (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _showInputError (inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._config.errorClass);
    inputElement.classList.add(this._config.inputErrorClass);
  }
  _hideInputError (inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._config.errorClass);
    inputElement.classList.remove(this._config.inputErrorClass);
  }
  _disableButton () {
    this._button = this._formElement.querySelector(this._config.submitButtonSelector);
    this._button.setAttribute('disabled', true);
    this._button.classList.add(this._config.inactiveButtonClass);
  }
  _enableButton () {
    this._button = this._formElement.querySelector(this._config.submitButtonSelector);
    this._button.removeAttribute('disabled', true);
    this._button.classList.remove(this._config.inactiveButtonClass);
  }
  _checkButton () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  _toggleButtonState() {
    if (this._checkButton(this._inputList)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }
  _setEventListeners () {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      inputElement.addEventListener('input', () => {
              this._checkInput(inputElement);
              this._toggleButtonState();
            });
    })
  }
  chekForm() {
    this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement);
    this._toggleButtonState();
    })
  }
  enableValidation () {
    this._setEventListeners ();
  }
}
