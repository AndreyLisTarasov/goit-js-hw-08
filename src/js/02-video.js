import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const PLAYER_CURRENT_TIME = 'videoplayer-current-time';

player.on(`timeupdate`, throttle(currentTimeOnVideo, 1000));
player
  .setCurrentTime(localStorage.getItem(PLAYER_CURRENT_TIME))
  .then(localStorage.getItem(PLAYER_CURRENT_TIME))
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;
    }
  });

function currentTimeOnVideo(e) {
  localStorage.setItem(PLAYER_CURRENT_TIME, JSON.stringify(e.seconds));
}
