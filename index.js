const body = document.querySelector("body");

const map = document.querySelector(".map");
const btnStart = document.querySelector(".btn-start");
const message = document.querySelector(".message");
const counter = document.querySelector(".click");
const backdropAlert = document.querySelector(".backdrop");
const modalText = document.querySelector(".modal-text");
const modalTitle = document.querySelector(".modal-title");

const btnClose = document.querySelector(".close-btn");
const btnRules = document.querySelector(".btn-rules");

const rulesList = document.querySelector(".rules-list");

const timerFace = document.querySelector(".timer-face");

let clicks = 0;
let color = null;
let isPlaying = false;
let timeValue = null;

const target = {
  x: 0,
  y: 0,
};

btnStart.addEventListener("click", gameStatusCheck);
btnRules.addEventListener("click", onRulesClick);
btnClose.addEventListener("click", onCloseModal);

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

  map.addEventListener("click", onMapClick);
  timer.start();
  btnStart.textContent = "Stop game";
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
  counter.textContent = ` ${clicks}`;
  const distance = getDistance(event, target);
  const messageHint = getMessage(distance);
  message.textContent = messageHint;
  message.style.color = color;
  if (distance < 20) {
    onOpenModal(
      "Congratulations! You win 🎉",
      `You found treasures in ${timeValue} time and in ${clicks} clicks! `
    );
    timer.stop();
    return;
  }
}

function onOpenModal(titleText, mainText, markup) {
  backdropAlert.classList.remove("is-hidden");
  body.classList.add("no-scroll");
  modalTitle.textContent = titleText;
  modalText.textContent = mainText;

  btnRules.setAttribute("disabled", true);
  btnStart.setAttribute("disabled", true);

  if (markup) {
    return rulesList.insertAdjacentHTML("beforeend", markup);
  }

  return;
}

function onCloseModal() {
  backdropAlert.classList.add("is-hidden");
  body.classList.remove("no-scroll");

  btnRules.removeAttribute("disabled");
  btnStart.removeAttribute("disabled");

  rulesList.innerHTML = "";
  modalTitle.textContent = "";
  modalText.textContent = "";

  updateTimer({ hours: "00", minutes: "00", seconds: "00" });

  stopGame();
}

function stopGame() {
  isPlaying = false;
  timer.stop();

  map.removeEventListener("click", onMapClick);
  btnStart.textContent = "Start game";

  clicks = 0;
  counter.textContent = ` ${clicks}`;
  message.textContent = " Let's start!";
  message.style.color = "yellow";

  return;
}

function onRulesClick() {
  if (isPlaying) {
    stopGame();
  }
  return onOpenModal("Game rules", "Good luck!", markup);
}

const rules = [
  "You must find the treasure as soon as possible.",
  "Look at the hints on the right, so you will quickly find the treasure.",
  "Try to make fewer clicks.",
  "The game will end when you find the treasure.",
];

const markup = rules
  .map((rule) => `<li class="rules-list__item">${rule}</li>`)
  .join("");

const timer = {
  intervalId: null,
  start() {
    const startTime = Date.now();

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();

      const deltaTime = currentTime - startTime;
      const timeComponent = convertMs(deltaTime);

      updateTimer(timeComponent);
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days

  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function updateTimer({ hours, minutes, seconds }) {
  let value = `${hours} : ${minutes} : ${seconds}`;
  timerFace.textContent = value;
  timeValue = value;
}
