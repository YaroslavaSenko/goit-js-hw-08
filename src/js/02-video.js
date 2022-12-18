import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_TIME_KEY = 'videoplayer-current-time';

function timePlayer() {
    player
        .getCurrentTime()
        .then(function (seconds) {
            localStorage.setItem(STORAGE_TIME_KEY, seconds);
        })
        .catch(function (error) {
            console.log(error.message);
        });
}

const currentTime = localStorage.getItem(STORAGE_TIME_KEY);
player
    .setCurrentTime(currentTime)
    .catch(function (error) {
        console.log(error.message);
    }
);

player.on('timeupdate', throttle(timePlayer, 1000));