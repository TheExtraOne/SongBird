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
    "question-section__question-1": {
        "Ru": 'Разминка',
        "Eng": 'Warm up'
    },
    "question-section__question-2": {
        "Ru": 'Воробьиные',
        "Eng": 'Old World sparrows'
    },
    "question-section__question-3": {
        "Ru": 'Лесные птицы',
        "Eng": 'Forest Birds'
    },
    "question-section__question-4": {
        "Ru": 'Певчие птицы',
        "Eng": 'Songbirds'
    },
    "question-section__question-5": {
        "Ru": 'Хищные птицы',
        "Eng": 'Predator birds'
    },
    "question-section__question-6": {
        "Ru": 'Морские птицы',
        "Eng": 'Sea Birds'
    },
    "answer-section__bird-info": {
        "Ru": 'Послушайте плеер. <br/>Выберите птицу из списка.',
        "Eng": 'Listen to the player. <br/>Select a bird from the list.'
    },
    "button-section__button": {
        "Ru": 'Следующий уровень',
        "Eng": 'Next level'
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