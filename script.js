const words = [
  "code", "keyboard", "challenge", "syntax", "loop", "array",
  "object", "function", "variable", "return", "scope", "async"
];
let timer = 60;
let interval;
let currentWord = "";
let correct = 0;
let total = 0;

const timerEl = document.getElementById("timer");
const wordEl = document.getElementById("word");
const inputEl = document.getElementById("input");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function showWord() {
  currentWord = getRandomWord();
  wordEl.textContent = currentWord;
  inputEl.value = "";
}

function startGame() {
  timer = 60;
  correct = 0;
  total = 0;
  inputEl.disabled = false;
  inputEl.focus();
  showWord();
  timerEl.textContent = timer;
  clearInterval(interval);
  interval = setInterval(() => {
    timer--;
    timerEl.textContent = timer;
    if (timer <= 0) {
      endGame();
    }
  }, 1000);
}

inputEl.addEventListener("input", () => {
  total++;
  if (inputEl.value.trim() === currentWord) {
    correct++;
    showWord();
  }
  updateStats();
});

function updateStats() {
  const minutes = (60 - timer) / 60;
  const wpm = minutes > 0 ? Math.round((correct / minutes)) : 0;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  wpmEl.textContent = wpm;
  accuracyEl.textContent = `${accuracy}%`;
}

function endGame() {
  clearInterval(interval);
  inputEl.disabled = true;
  if ((correct / total) * 100 < 50) {
    wordEl.textContent = "💥 BOOM! Try Again!";
    wordEl.classList.add("explode");
  } else {
    wordEl.textContent = "🔥 Great Job!";
    wordEl.classList.remove("explode");
  }
}
