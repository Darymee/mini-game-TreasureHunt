import { refs } from "../js/refs.js";
import { timer, updateTimer, timeValue } from "./timer.js";
import { onOpenModal } from "./modal.js";

let clicks = 0;
let color = null;
export let isPlaying = false;

const target = {
  x: 0,
  y: 0,
};

refs.btnStart.addEventListener("click", gameStatusCheck);

function gameStatusCheck() {
  if (!isPlaying) {
    onStart();
    return;
  }
  stopGame();
  updateTimer({ hours: "00", minutes: "00", seconds: "00" });

  return;
}

function onStart() {
  isPlaying = true;

  refs.map.addEventListener("click", onMapClick);
  timer.start();
  refs.btnStart.textContent = "Stop game";
}

// Generate random number from 0 to map size
function genTargetCoords(width, height) {
  const x = Math.floor(Math.random() * width);
  const y = Math.floor(Math.random() * height);
  target.x = x;
  target.y = y;
  return;
}

// Count distance between target and click
function getDistance(event, target) {
  const x = event.offsetX - target.x;
  const y = event.offsetY - target.y;

  return Math.sqrt(x * x + y * y);
}

// Change hint message
function getMessage(distance) {
  if (distance < 50) {
    color = "red";
    return " It's burning 🔥!!!";
  }
  if (distance < 100) {
    color = "#FF2400";
    return " It's very hot!!!";
  }
  if (distance < 200) {
    color = "#E32636";
    return " It's hot!";
  }
  if (distance < 500) {
    color = "#DA727D";
    return " It's warm";
  }
  if (distance < 700) {
    color = "#7EC2E7";
    return " It's cold";
  }
  if (distance < 850) {
    color = "#9ACEEB";
    return " It's really cold, brr...";
  } else {
    color = "#C2DBEB";
    return " Today is not your day";
  }
}

genTargetCoords(1000, 600);



function onMapClick(event) {
  clicks += 1;
  refs.counter.textContent = ` ${clicks}`;
  const distance = getDistance(event, target);
  const messageHint = getMessage(distance);
  refs.message.textContent = messageHint;
  refs.message.style.color = color;
  if (distance < 20) {
    onOpenModal(
      "Congratulations! You win 🎉",
      `You found treasures in ${timeValue} time and in ${clicks} clicks! `
    );
    timer.stop();
    return;
  }
}


export function stopGame() {
  isPlaying = false;
  timer.stop();

  refs.map.removeEventListener("click", onMapClick);
  refs.btnStart.textContent = "Start game";

  clicks = 0;
  refs.counter.textContent = ` ${clicks}`;
  refs.message.textContent = " Let's start!";
  refs.message.style.color = "yellow";

  return;
}
