import Player from '@vimeo/player';

const throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const STOREGE_KEY = 'videoplayer-current-time';
let localStorageObj = {};

try {
  localStorageObj = JSON.parse(localStorage.getItem(STOREGE_KEY));
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}

player.on('timeupdate', throttle(setLocalStorage, 1000));

if (localStorageObj) {
  player.setCurrentTime(localStorageObj.seconds).catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;
      default:
        break;
    }
  });
}

function setLocalStorage(e) {
  localStorage.setItem(STOREGE_KEY, JSON.stringify(e));
}
