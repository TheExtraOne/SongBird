'use strict'

/*Popup*/
const burgerButton = document.querySelector('.header__burger-menu');
burgerButton.addEventListener('click', showPopup);

const popup = document.querySelector('.popup');
popup.addEventListener('click', closePopup);

const crossButton = document.querySelector('.popup__close');
crossButton.addEventListener('click', closePopup);

function showPopup() {
    popup.classList.toggle('popup_invis');
}

function closePopup(event) {
    event.stopPropagation();
    popup.classList.toggle('popup_invis');
}