const map = document.querySelector(".map");
const start = document.querySelector(".btn-start");
const message = document.querySelector(".message");
const counter = document.querySelector(".click");
let clicks = 0;
const target = {
  x: 0,
  y: 0,
};

start.addEventListener("click", onStart);

function onStart() {
  map.addEventListener("click", onMapClick);
  start.textContent = "Stop game";
}

// Generate random number from 0 to map size
function genTargetCoords(width, height) {
  const x = Math.floor(Math.random() * width);
  const y = Math.floor(Math.random() * height);
  target.x = x;
  target.y = y;
  return;
}

// Count distance beatween target and click
function getDistance(event, target) {
  const x = event.offsetX - target.x;
  const y = event.offsetY - target.y;
  return Math.sqrt(x * x + y * y);
}

function getMessage(distance) {
  if (distance < 50) {
    return " It's burn!!!";
  }
  if (distance < 100) {
    return " It's very hot!!!";
  }
  if (distance < 200) {
    return " It's hot!";
  }
  if (distance < 500) {
    return " It's warm";
  }
  if (distance < 700) {
    return " It's cold";
  }
  if (distance < 850) {
    return " It's really cold, brr...";
  } else {
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
  if (distance < 20) {
    alert("Клад найден! Сделано кликов: " + clicks);
  }
  //   if (clicks > 10) {
  //     alert("Игра закончена, осталось 0 кликов");
  //   }
}
