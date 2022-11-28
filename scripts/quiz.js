import birdsData from "./birds-data.js";
import birdsDataEn from "./birds-data-eng.js";

let birdsInfo = birdsData;
if ( localStorage.getItem('chosenLang') === 'Eng' ) {
  birdsInfo = birdsDataEn;
} 

let currentLevel = 0;
let currentRightAnswerID = null;
let currentRightImg = null;
let currentRightName = null;
let isRightAnswerDone = false;
let currentScore = 0;
let attempt = 5;

const scoreSpan = document.querySelector('.questions-section__score');
const button = document.querySelector('.button-section__button');
button.addEventListener('click', nextLevel);

//музыка
let sideEffectsVolume = 0.3;
let isMusicLaunched = false;

const correctAudio = new Audio();
correctAudio.volume = sideEffectsVolume;
correctAudio.src = "../sounds/correct.mp3";

const wrongAudio = new Audio();
wrongAudio.volume = sideEffectsVolume;
wrongAudio.src = "../sounds/wrong.mp3";

function lounchMusic() {
  clickSoundInit(correctAudio);
  clickSoundInit(wrongAudio);
}

function clickSoundInit(audio) {
  audio.play(); // запускаем звук
  audio.pause(); // и сразу останавливаем
}

function clickSound(audio) {
  audio.currentTime = 0; // в секундах
  audio.play();
}
/*Начальное построение уровня */
function initLevel(level) {
  const currentAnswerObject = randomDiap( 0, birdsInfo[level].length - 1 );

  const audio = document.querySelector('.custom-audio');
  audio.src = birdsInfo[level][currentAnswerObject].audio;

  currentRightAnswerID = birdsInfo[level][currentAnswerObject].id;
  currentRightImg = birdsInfo[level][currentAnswerObject].image;
  currentRightName = birdsInfo[level][currentAnswerObject].name;

  //Создаю список вариантов ответов
  const birdList = document.querySelector('.answer-section__bird-list');
  const birdsAnswersName = birdsInfo[level].map(item => {return {bird: item.name, id : item.id}} );
  birdsAnswersName.forEach((item) => {
      const birdContainer = document.createElement('div');
      birdContainer.classList.add('answer-section_bird');
      birdContainer.id = `${item.id}`;
      birdContainer.addEventListener('click', checkAnswer);

      const point = document.createElement('span');
      point.classList.add('answer-section__point');
      birdContainer.append(point);

      const birdName = document.createElement('span');
      birdName.classList.add('answer-section_bird-name');
      birdName.innerText = `${item.bird}`;
      birdContainer.append(birdName);

      birdList.append(birdContainer)
  })

  //Подсвечиваю текущий вопрос
  highlightCurrentQuestion();
}

initLevel(currentLevel);
console.log('Right answer is ' + currentRightAnswerID);

function highlightCurrentQuestion() {
  let arrQuestion = document.querySelectorAll('.question-section__question');
  arrQuestion.forEach( (item, index) => {
      if ( item.classList.contains('question-section__question_active') ) {
          item.classList.remove('question-section__question_active');
      }
      if (index === currentLevel) {
          item.classList.add('question-section__question_active');
      }
  })
}

function checkAnswer(event) {
  if (isRightAnswerDone) {
      buildBurdInfo(event.currentTarget.id);
      return;
  }

  if (!isMusicLaunched) {
      lounchMusic();
  }
  isMusicLaunched = true;

  if ( (+event.currentTarget.id) === currentRightAnswerID ) {
      isRightAnswerDone = true;
      recolorPoint('#4fab8f', event.currentTarget.firstElementChild);
      clickSound(correctAudio);
      showCard();
      //Остановить плеер
      song.pause();
      mode = 1;
      btnImage.src = "../assets/icons/play.svg";
      clearInterval(audioPlay);
      //Счет
      currentScore += attempt;
      scoreSpan.innerText = `${currentScore}`;
      //Разблокировать кнопку
      button.classList.toggle('button-section__button_able');
  } else {
      attempt--;
      recolorPoint('#cc5a74', event.currentTarget.firstElementChild);
      clickSound(wrongAudio);
  }

  buildBurdInfo(event.currentTarget.id);
}

/* Сайд функции*/
function randomDiap(n, m) {
  return Math.floor( Math.random() * (m - n + 1) ) + n;
}

function recolorPoint(color, point) {
  point.style.backgroundColor = `${color}`;
}

function buildBurdInfo(choosenID) {
  birdsInfo[currentLevel].forEach(item => {
    if ( item.id === (+choosenID) ) {
      const birdInfo = document.querySelector('.answer-section__bird-info');
      birdInfo.innerHTML = `<div class="answer-section__bird-img"></div>
                          <div class="answer-section__bird-name">${item.name}</div>
                          <div class="answer-section__bird-latin">${item.species}</div>
                          <div class="audio-container_mini">
                              <audio src=${item.audio} class="custom-audio_mini"></audio>
                              <div class ="controls_mini">
                              <button class="controls__play_mini">
                                  <img src="../assets/icons/play.svg" alt="" class="controls__play-img_mini">
                              </button>
                              <div class="controls__audio-length_mini">
                                  <div class="controls__played-time_mini">
                                  <span class="controls__point_mini"></span>
                                  </div>
                                  <span class="current-time_mini">00:00</span>
                                  <span class="duration_mini">00:00</span>
                              </div>
                              <div class="controls__volume_mini">
                                  <input type="range" min="0" max="1" value="0.5" step="0.1" class="controls__range_mini controls__range_invis_mini">
                                  <img src="../assets/icons/volume.svg" alt="" class="controls__volume-img_mini">
                              </div>
                              </div>
                          </div>
                          ${item.description}`;
      let modeMini = 1; // 1-play, 2-stop
      let audioPlayMini;
      
      const songMini = document.querySelector('.custom-audio_mini');
      const playedTimeMini = document.querySelector('.controls__played-time_mini');
      const btnImageMini = document.querySelector('.controls__play-img_mini');
      const currentTimeMini = document.querySelector('.current-time_mini');
      const durationMini = document.querySelector('.duration_mini');
      const btnPlayMini = document.querySelector('.controls__play_mini');
      btnPlayMini.addEventListener('click', playMini);
      
      const rangeMini = document.querySelector('.controls__range_mini');
      rangeMini.addEventListener('change', changeVolumeMini);
      const btnVolumeMini = document.querySelector('.controls__volume-img_mini');
      btnVolumeMini.addEventListener('click', showVolumeMini);

      const pointMini = document.querySelector('.controls__point_mini');
      const audioWholeLengthMini = document.querySelector('.controls__audio-length_mini');
      const initialPos = playedTimeMini.getBoundingClientRect().left;
      pointMini.addEventListener('mousedown', movePointMini);
      pointMini.addEventListener('dragstart', () => false);
      
      function playMini() {
        if (modeMini === 1) {
          songMini.play();
          modeMini = 2;
          btnImageMini.src = "../assets/icons/stop.svg";
          
          audioPlayMini = setInterval(function() {
              let audioTime = Math.round(songMini.currentTime);
              displayTime(audioTime, currentTimeMini);
      
              let audioLength = Math.round(songMini.duration);
              displayTime(audioLength, durationMini);
      
              if (audioTime === audioLength) {
                songMini.currentTime = 0;
                songMini.pause();
                modeMini = 1;
                btnImageMini.src = "../assets/icons/play.svg";
                clearInterval(audioPlayMini);
              }
    
            playedTimeMini.style.width = (audioTime * 100) / audioLength + '%';
          }, 100)
        } else {
          songMini.pause();
          modeMini = 1;
          btnImageMini.src = "../assets/icons/play.svg";
          clearInterval(audioPlayMini);
        }
      }
      
      function showVolumeMini() {
        rangeMini.classList.toggle('controls__range_invis_mini');
      }
      
      function changeVolumeMini(event) {
        songMini.volume = event.target.value;
      }

      function movePointMini(event) {
        event.preventDefault();
      
        let shiftX = event.clientX - pointMini.getBoundingClientRect().left;
      
        document.addEventListener('mousemove', onMouseMoveMini);
        document.addEventListener('mouseup', onMouseUpMini);
      
        function onMouseMoveMini(event) {
          let newWidthMini = ((event.clientX - shiftX - audioWholeLengthMini.getBoundingClientRect().left) / audioWholeLengthMini.getBoundingClientRect().width) * 100;
      
          if (newWidthMini >= 100) {
            newWidthMini = 100;
          }
          if (newWidthMini <= 0) {
            newWidthMini = 0;
          }
      
          playedTimeMini.style.width = newWidthMini + '%';
      
          let audioLengthMini = Math.round(songMini.duration);
      
          songMini.currentTime = audioLengthMini * (newWidthMini / 100);
        }
      
        function onMouseUpMini() {
          document.removeEventListener('mouseup', onMouseUpMini);
          document.removeEventListener('mousemove', onMouseMoveMini);
        }
      }
      
      const birdImg = document.querySelector('.answer-section__bird-img');
      birdImg.style.backgroundImage = `url(${item.image})`;
      birdImg.style.backgroundPosition = 'center';
    }
  });
}

function showCard() {
  const currentBird = document.querySelector('.current-question__bird');
  currentBird.style.backgroundImage = `url(${currentRightImg})`;
  //console.log(currentRightImg);
  currentBird.style.backgroundPosition = 'center';

  const currentBirdName = document.querySelector('.current-question__bird-name');
  currentBirdName.innerText = `${currentRightName}`;
}

function hideInfo() {
  const currentBird = document.querySelector('.current-question__bird');
  currentBird.style.backgroundImage = '';

  const currentBirdName = document.querySelector('.current-question__bird-name');
  currentBirdName.innerText = '******';

  const birdInfo = document.querySelector('.answer-section__bird-info');
  if ( localStorage.getItem('chosenLang') === 'Eng' ) {
    birdInfo.innerHTML = 'Listen to the player. <br/>Select a bird from the list.';
  } else {
    birdInfo.innerHTML = 'Послушайте плеер. <br/> Выберите птицу из списка.';
  }

}
function nextLevel() {
  if (!isRightAnswerDone) {
      return;
  }

  //если это был последний вопрос
  if (currentLevel === 5) {
      console.log('win');
      localStorage.setItem('currentScore', currentScore);
      window.location.href = '../pages/win.html';
      return;
  }

  //актуализию переменные
  currentLevel++;
  currentRightAnswerID = null;
  currentRightImg = null;
  currentRightName = null;
  isRightAnswerDone = false;
  attempt = 5;
  mode = 1;
  btnImage.src = "../assets/icons/play.svg";
  clearInterval(audioPlay);
  song.currentTime = 0;
  song.pause();
  displayTime(0, currentTime);
  displayTime(0, duration);
  playedTime.style.width = 0 + '%';

  //блокирую кнопку
  button.classList.toggle('button-section__button_able');

  //ставлю заглушки на блок с вопросом и информацию
  hideInfo();

  //подсвечиваю тек.вопрос
  highlightCurrentQuestion();

  //удаляю старый блок
  const birdList = document.querySelector('.answer-section__bird-list');
  birdList.innerHTML = '';
  //строю новый блок
  initLevel(currentLevel);
  console.log('Right answer is ' + currentRightAnswerID);
}
