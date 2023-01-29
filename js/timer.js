import { refs } from "../js/refs.js";

export let timeValue = null;

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

export function updateTimer({ hours, minutes, seconds }) {
  let value = `${hours} : ${minutes} : ${seconds}`;
  refs.timerFace.textContent = value;
  timeValue = value;
}

export const timer = {
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
