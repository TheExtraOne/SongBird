const mainTranslation = {
    "header__nav-link_header-main": {
        "Ru": 'Главная',
        "Eng": 'Main'
    },
    "header__nav-link_header-quiz": {
        "Ru": 'Викторина',
        "Eng": 'Quiz'
    },
    "header__nav-link_header-gal": {
        "Ru": 'Галерея',
        "Eng": 'Gallery'
    },
    "header__nav-link_pop-main": {
        "Ru": 'Главная',
        "Eng": 'Main'
    },
    "header__nav-link_pop-quiz": {
        "Ru": 'Викторина',
        "Eng": 'Quiz'
    },
    "header__nav-link_pop-gal": {
        "Ru": 'Галерея',
        "Eng": 'Gallery'
    },
}

const language = document.querySelectorAll('.header__language');
language.forEach(lang => lang.addEventListener('click', changeLangClick));

let chosenLang;
if( localStorage.getItem('chosenLang') ) {
    chosenLang = localStorage.getItem('chosenLang');
    changeLang();
}

function changeLangClick(event) {
    if ( event.target.classList.contains('Eng') ) {
        chosenLang = "Eng";
    } else {
        chosenLang = "Ru";
    }
    
    localStorage.setItem('chosenLang', chosenLang);
    location.reload(); //обновляю страницу, чтобы подключился верный языковой модуль в quiz.js
    changeLang();
}

function changeLang() {
    language.forEach(lang => {
        (lang.classList.contains(chosenLang)) 
        ? lang.classList.add('header__language_active')
        : lang.classList.remove('header__language_active')
    });

    for (let key in mainTranslation) {
        document.querySelector(`.${key}`).innerHTML = mainTranslation[key][chosenLang];
    }
}