import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const currentTime = 'videoplayer-current-time';

player.on(`timeupdate`, throttle(currentTimeOnVideo, 1000));
player
  .setCurrentTime(localStorage.getItem(currentTime))
  .then(localStorage.getItem(currentTime))
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;
    }
  });

function currentTimeOnVideo(evt) {
  localStorage.setItem(currentTime, JSON.stringify(evt.seconds));
}
