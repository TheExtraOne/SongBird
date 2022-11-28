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
    "main-banner__text-container": {
        "Ru": 'Помоги <br/>природе <br/>в один клик',
        "Eng": 'Help <br/>nature <br/>in one click'
    },
    "main-banner__button-link": {
        "Ru": 'Читать дальше...',
        "Eng": 'Read more...'
    },
    "about__title": {
        "Ru": 'О нас',
        "Eng": 'About us'
    },
    "about__text-first": {
        "Ru": 'Мы некоммерческая организация, главная цель которой &mdash; помогать диким птицам. Создавая викторины и публикуя фото, сделанные волонтерами, мы стараемся привлекать общественное внимание к таким близким, но незнакомым пернатым.',
        "Eng": 'We are an uncommercial organization which main goal is to help wild birds. By creating quizzes and publishing photos taken by volunteers, we try to attract public attention to such close, but unfamiliar birds.'
    },
    "about__text-sec": {
        "Ru": 'Мы не принимаем пожертвования напрямую, но перенаправляем вас на страницы организаций, где вы можете пожертвовать птицам вашей страны.',
        "Eng": 'We do not accept donations here, but we redirect you to the pages of organizations where you can donate to the birds of your country.'
    },
    "quiz__button-link": {
        "Ru": 'Пройти викторину...',
        "Eng": 'Take the quiz...'
    },
    "partners__title": {
        "Ru": 'Наши партнеры',
        "Eng": 'Our partners'
    },
    "parnter__name-1": {
        "Ru": 'Сирин',
        "Eng": 'Sirin'
    },
    "parter__info-1": {
        "Ru": 'Центр помощи диким животным «Сирин» &mdash; уникальная для Беларуси организация, в которой оказывают помощь диким птицам и зверям. Центр изымает травмированных и ослабленных животных, лечит, реабилитирует и возвращает обратно в природу.',
        "Eng": 'The Sirin Center for Wild Animals is a unique organization for Belarus that provides assistance to wild birds and animals. The center accepts injured and weakened animals, treats, rehabilitates and returns them back to nature.'
    },
    "parter__link-1": {
        "Ru": 'Узнать больше &#8594;',
        "Eng": 'Learn more &#8594;'
    },
    "parnter__name-2": {
        "Ru": 'Всемирный фонд дикой природы',
        "Eng": 'World Wildlife Fund'
    },
    "parter__info-2": {
        "Ru": 'Всемирный фонд дикой природы &mdash; российская независимая национальная природоохранная неполитическая организация. Миссия WWF состоит в предотвращении нарастающей деградации естественной среды планеты и достижении гармонии человека и природы.',
        "Eng": 'The World Wildlife Fund is a Russian independent national environmental non-political organization. The mission of WWF is to prevent the growing degradation of the planet\'s natural environment and to achieve harmony between man and nature.'
    },
    "parter__link-2": {
        "Ru": 'Узнать больше &#8594;',
        "Eng": 'Learn more &#8594;'
    },
    "parnter__name-3": {
        "Ru": 'Союз Охраны птиц России',
        "Eng": 'Russian Bird Protection Union'
    },
    "parter__info-3": {
        "Ru": 'Союз Охраны птиц Росии &mdash; объединение орнитологов-любителей, ведущие учет размера стай разных видов птиц по разным областям России. СОПР так же проводит компании по наблюдению, подкормке и поддрежке редких видов пернатых.',
        "Eng": 'Russian Bird Protection Union is an association of amateur ornithologists who keep records of the size of flocks of different bird species in different regions of Russia. RBPU also conducts campaigns for observation, feeding and support of rare species of birds.'
    },
    "parter__link-3": {
        "Ru": 'Узнать больше &#8594;',
        "Eng": 'Learn more &#8594;'
    },
    "parnter__name-4": {
        "Ru": 'Украинское общество защиты птиц',
        "Eng": 'Ukrainian Bird Protection Society'
    },
    "parter__info-4": {
        "Ru": 'Цель общества &mdash; предотвратить уменьшение численности и исчезновение редких видов птиц, поддерживать их разнообразие в природе путем защиты экосисем и уменьшения влияния человека.',
        "Eng": 'The goal of the society is to prevent the decrease of number and disappearance of rare species of birds, to maintain their diversity in nature by protecting ecosystems and reducing human influence.'
    },
    "parter__link-4": {
        "Ru": 'Узнать больше &#8594;',
        "Eng": 'Learn more &#8594;'
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