'use strict'

const maxPoints = 30;
const score = +localStorage.getItem('currentScore');
const currentScore = document.querySelector('.current-score');
currentScore.textContent = `${score}`;

let nextUrl = '../index.html';

const button = document.querySelector('.win-section__button');
button.addEventListener('click', redirect);

if (score === maxPoints) {
    if ( localStorage.getItem('chosenLang') === 'Eng' ) {
        button.textContent = 'Finish';
    } else {
        button.textContent = 'Завершить';
    }
} else {
    if ( localStorage.getItem('chosenLang') === 'Eng' ) {
        button.textContent = 'Try one more time';
    } else {
        button.textContent = 'Попробовать еще раз';
    }
    nextUrl = '../pages/quizz.html';
}

function redirect() {
    window.location.href = nextUrl;
}

