import { refs } from "../js/refs.js";
import { updateTimer } from "./timer.js";
import { stopGame, isPlaying } from "./index.js";

refs.btnClose.addEventListener("click", onCloseModal);
refs.btnRules.addEventListener("click", onRulesClick);

export function onOpenModal(titleText, mainText, markup) {
  refs.backdropAlert.classList.remove("is-hidden");
  refs.body.classList.add("no-scroll");
  refs.modalTitle.textContent = titleText;
  refs.modalText.textContent = mainText;

  refs.btnRules.setAttribute("disabled", true);
  refs.btnStart.setAttribute("disabled", true);

  if (markup) {
    return refs.rulesList.insertAdjacentHTML("beforeend", markup);
  }

  return;
}

export function onCloseModal() {
  refs.backdropAlert.classList.add("is-hidden");
  refs.body.classList.remove("no-scroll");

  refs.btnRules.removeAttribute("disabled");
  refs.btnStart.removeAttribute("disabled");

  refs.rulesList.innerHTML = "";
  refs.modalTitle.textContent = "";
  refs.modalText.textContent = "";

  updateTimer({ hours: "00", minutes: "00", seconds: "00" });

  stopGame();
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
