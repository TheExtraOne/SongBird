'use strict'

let mode = 1; // 1-play, 2-stop
let audioPlay;

const song = document.querySelector('.custom-audio');
const playedTime = document.querySelector('.controls__played-time');
const btnImage = document.querySelector('.controls__play-img');
const currentTime = document.querySelector('.current-time');
const duration = document.querySelector('.duration');
const btnPlay = document.querySelector('.controls__play');
btnPlay.addEventListener('click', play);

const range = document.querySelector('.controls__range');
range.addEventListener('change', changeVolume);
const btnVolume = document.querySelector('.controls__volume-img');
btnVolume.addEventListener('click', showVolume);

const point = document.querySelector('.controls__point');
const audioWholeLength = document.querySelector('.controls__audio-length');
const initialPos = playedTime.getBoundingClientRect().left;
point.addEventListener('mousedown', movePoint);
point.addEventListener('dragstart', () => false);

function play() {
  if (mode === 1) {
    song.play();
    mode = 2;
    btnImage.src = "../assets/icons/stop.svg";
  
    audioPlay = setInterval(function() {
      let audioTime = Math.round(song.currentTime);
      displayTime(audioTime, currentTime);

      let audioLength = Math.round(song.duration);
      displayTime(audioLength, duration);

      if (audioTime === audioLength) {
        song.currentTime = 0;
        song.pause();
        mode = 1;
        btnImage.src = "../assets/icons/play.svg";
        clearInterval(audioPlay);
      }

      playedTime.style.width = (audioTime * 100) / audioLength + '%';
    }, 100)
  } else {
    song.pause();
    mode = 1;
    btnImage.src = "../assets/icons/play.svg";
    clearInterval(audioPlay);
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

function showVolume() {
  range.classList.toggle('controls__range_invis');
}

function changeVolume(event) {
  song.volume = event.target.value;
}

function movePoint(event) {
  event.preventDefault();

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