import birdsData from "./birds-data.js";
import birdsDataEn from "./birds-data-eng.js";

const container = document.querySelector('.gallery__container');
let birdsInfo = birdsData;

if ( localStorage.getItem('chosenLang') === 'Eng' ) {
  birdsInfo = birdsDataEn;
}

//построение карточек
birdsInfo = birdsInfo.flat(1);
birdsInfo.forEach(bird => {
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('gallery__card-container');

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('gallery__img-container');

  const img = document.createElement('img');
  img.classList.add('gallery__img');
  img.src = bird.image;
  img.alt = `${bird.name}`;
  imgContainer.append(img);
  cardContainer.append(imgContainer);

  const birdName = document.createElement('h3');
  birdName.classList.add('gallery__bird-name');
  birdName.innerText = bird.name;
  cardContainer.append(birdName);

  const birdNameLat = document.createElement('p');
  birdNameLat.classList.add('gallery__bird-name-lat');
  birdNameLat.innerText = bird.species;
  cardContainer.append(birdNameLat);

  const birdInfo = document.createElement('p');
  birdInfo.classList.add('gallery__bird-info');
  birdInfo.innerText = bird.description;
  cardContainer.append(birdInfo);

  const audioContainer = document.createElement('div');
  audioContainer.classList.add('audio-container');

  const customAudio = document.createElement('audio');
  customAudio.classList.add('custom-audio');
  customAudio.src = bird.audio;
  audioContainer.append(customAudio);

  const controls = document.createElement('div');
  controls.classList.add('controls');
  audioContainer.append(controls);

  const button = document.createElement('button');
  button.classList.add('controls__play');
  controls.append(button);

  const buttonImg = document.createElement('img');
  buttonImg.classList.add('controls__play-img');
  buttonImg.alt = '';
  buttonImg.src = "../assets/icons/play.svg";
  button.append(buttonImg);

  const controlsAudioLength = document.createElement('div');
  controlsAudioLength.classList.add('controls__audio-length');
  controls.append(controlsAudioLength);

  const controlsPlayedTime = document.createElement('div');
  controlsPlayedTime.classList.add('controls__played-time');
  controlsAudioLength.append(controlsPlayedTime);

  const controlsPoint = document.createElement('span');
  controlsPoint.classList.add('controls__point');
  controlsPlayedTime.append(controlsPoint);

  const currentTime = document.createElement('span');
  currentTime.classList.add('current-time');
  currentTime.innerText = '00:00';
  controlsAudioLength.append(currentTime);

  const duration = document.createElement('span');
  duration.classList.add('duration');
  duration.innerText = '00:00';
  controlsAudioLength.append(duration);

  const controlsVolume = document.createElement('div');
  controlsVolume.classList.add('controls__volume');
  controls.append(controlsVolume);

  const inputVolume = document.createElement('input');
  inputVolume.className = 'controls__range controls__range_invis';
  inputVolume.type = 'range';
  inputVolume.min = '0';
  inputVolume.max = '1';
  inputVolume.value = "0.5";
  inputVolume.step = "0.1";
  controlsVolume.append(inputVolume);

  const voluneImg = document.createElement('img');
  voluneImg.classList.add('controls__volume-img');
  voluneImg.alt = '';
  voluneImg.src = "../assets/icons/volume.svg";
  controlsVolume.append(voluneImg);

  cardContainer.append(audioContainer);
  container.append(cardContainer);
});

//Плееры
let mode = 1; // 1-play, 2-stop

const btnPlay = document.querySelectorAll('.controls__play');
btnPlay.forEach(btn => btn.addEventListener('click', play));


const range = document.querySelectorAll('.controls__range');
range.forEach(control => control.addEventListener('change', changeVolume));

const btnVolume = document.querySelectorAll('.controls__volume-img');
btnVolume.forEach(btn => btn.addEventListener('click', showVolume));

// const playedTime = document.querySelector('.controls__played-time');
// const initialPos = playedTime.getBoundingClientRect().left;
const points = document.querySelectorAll('.controls__point');
points.forEach(point => point.addEventListener('mousedown', movePoint));
points.forEach(point => point.addEventListener('dragstart', () => false));

function play(event) {
  const parent = event.target.closest('.audio-container');
  const song = parent.querySelector('.custom-audio');
  const btnImage = parent.querySelector('.controls__play-img');
  const playedTime = parent.querySelector('.controls__played-time');
  const currentTime = parent.querySelector('.current-time');
  const duration = parent.querySelector('.duration');
  let audioKey = `audioPlay${Math.random()}`;
  let audioPlay = {key:audioKey};

  if (mode === 1) {
    clearInterval(audioPlay.key);
    song.play();
    mode = 2;
    btnImage.src = "../assets/icons/stop.svg";
  
    audioPlay.key = setInterval(function() {
      let audioTime = Math.round(song.currentTime);
      displayTime(audioTime, currentTime);

      let audioLength = Math.round(song.duration);
      displayTime(audioLength, duration);

      if (audioTime === audioLength) {
        song.currentTime = 0;
        song.pause();
        mode = 1;
        btnImage.src = "../assets/icons/play.svg";
        clearInterval(audioPlay.key);
      }

      playedTime.style.width = (audioTime * 100) / audioLength + '%';
    }, 100)
  } else {
    song.pause();
    mode = 1;
    btnImage.src = "../assets/icons/play.svg";
    clearInterval(audioPlay.key);
  }
}

function displayTime(time, face) {
  if (time < 10) {
    face.textContent = `00:0${time}`;
  } else if (time >= 10 && time < 60) {
    face.textContent = `00:${time}`;
  } else if (time >= 60) {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    if (minutes < 10 && seconds < 10) {
      face.textContent = `0${minutes}:0${seconds}`;
    } else if (minutes < 10 && seconds >= 10) {
      face.textContent = `0${minutes}:${seconds}`;
    } else if (minutes >= 10 && seconds < 10) {
      face.textContent = `${minutes}:0${seconds}`;
    } else if (minutes >= 10 && seconds >= 10) {
      face.textContent = `${minutes}:${seconds}`;
    }
  }
}

function showVolume(event) {
  const parent = event.target.closest('.audio-container');
  const range = parent.querySelector('.controls__range');
  range.classList.toggle('controls__range_invis');
}

function changeVolume(event) {
  const parent = event.target.closest('.audio-container');
  const song = parent.querySelector('.custom-audio');
  song.volume = event.target.value;
}

function movePoint(event) {
  event.preventDefault();

  const parent = event.target.closest('.audio-container');
  const point = parent.querySelector('.controls__point');
  const audioWholeLength = parent.querySelector('.controls__audio-length');
  const song = parent.querySelector('.custom-audio');
  const playedTime = parent.querySelector('.controls__played-time');

  let shiftX = event.clientX - point.getBoundingClientRect().left;

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  function onMouseMove(event) {
    let newWidth = ((event.clientX - shiftX - audioWholeLength.getBoundingClientRect().left) / audioWholeLength.getBoundingClientRect().width) * 100;

    if (newWidth >= 100) {
      newWidth = 100;
    }
    if (newWidth <= 0) {
      newWidth = 0;
    }

    playedTime.style.width = newWidth + '%';

    let audioLength = Math.round(song.duration);

    song.currentTime = audioLength * (newWidth / 100);
  }

  function onMouseUp() {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
  }
}