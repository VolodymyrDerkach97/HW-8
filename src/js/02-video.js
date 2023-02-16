import Player from '@vimeo/player';

const throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const STOREGE_KEY = 'videoplayer-current-time';

const setLocalStorage = e =>
  localStorage.setItem(STOREGE_KEY, JSON.stringify(e));

player.on('timeupdate', throttle(setLocalStorage, 1000));

function createlocalStorageObj() {
  const localStorageObj = JSON.parse(
    localStorage.getItem(STOREGE_KEY)
  );
  if (localStorageObj) {
    return localStorageObj;
  }
}
player.setCurrentTime(createlocalStorageObj().seconds).catch(function (error) {
  switch (error.name) {
    case 'RangeError':
      break;
    default:
      break;
  }
});
