import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.querySelector("iframe");
const player = new Player(iframe);

const STORAGE_VIDEO_KEY = "videoplayer-current-time";

// player.on("play", function (e) {
//   console.log("played the video!");
// });

player.on("timeupdate", throttle(saveTime, 1000));
function saveTime(e) {
  let currentTime = e.seconds;

  console.log(currentTime);

  localStorage.setItem(STORAGE_VIDEO_KEY, currentTime);
}

currentTime = localStorage.getItem(STORAGE_VIDEO_KEY);
console.log(currentTime);
player
  .setCurrentTime(currentTime)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case "RangeError":
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
