let editBtn = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close-icon');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__item_el_name');
let jobInput = document.querySelector('.form__item_el_job');
let itemsInput = document.querySelectorAll('.form__item');
editBtn.addEventListener('click', () =>{
  popup.classList.add('popup_opened');
});
closePopup.addEventListener('click', () =>{
  popup.classList.remove('popup_opened');
});
function handleFormSubmit (evt) {
  evt.preventDefault(); 
  let name = nameInput.value;
  let job = jobInput.value;
  let profileName = document.querySelector('.profile__name');
  let profileBio = document.querySelector('.profile__bio');
  profileName.textContent = name;
  profileBio.textContent = job;
  if (name == '') {
    profileName.textContent = 'Пустое поле';
  }
  console.log(name);
  popup.classList.remove('popup_opened');
};
formElement.addEventListener('submit', handleFormSubmit); 

