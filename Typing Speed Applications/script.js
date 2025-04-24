let startButton = document.getElementById("startBtn");
let typingInput = document.getElementById("typingInput");
let sentenceElement = document.getElementById("sentence");
let timeElement = document.getElementById("time");
let speedElement = document.getElementById("speed");
let resultElement = document.getElementById("result");
let finalSpeedElement = document.getElementById("finalSpeed");

const sentence = "The quick brown fox jumps over the lazy dog. JavaScript is awesome!";
let startTime, endTime;
let wordCount = 0;
let correctWords = 0;
let incorrectWords = 0;
let timer;

function startTest() {
  startButton.disabled = true;
  typingInput.disabled = false;
  typingInput.value = "";
  timeElement.textContent = "Time: 0s";
  speedElement.textContent = "Speed: 0 WPM";
  wordCount = 0;
  correctWords = 0;
  incorrectWords = 0;

  sentenceElement.innerHTML = sentence.split(" ").map(word => `<span>${word}</span>`).join(" ");
  let words = sentenceElement.querySelectorAll("span");
  words.forEach(word => word.classList.remove("correct", "incorrect"));

  startTime = new Date().getTime();
  typingInput.focus();

  timer = setTimeout(endTest, 60000); // 1-minute timer
  typingInput.addEventListener("input", checkInput);
}

function checkInput() {
  let typedText = typingInput.value;
  let words = sentence.split(" ");
  let typedWords = typedText.split(" ");
  
  let currentWordIndex = typedWords.length - 1;
  
  // Mark the typed words
  let wordElements = sentenceElement.querySelectorAll("span");
  
  if (typedWords[currentWordIndex] === words[currentWordIndex]) {
    wordElements[currentWordIndex].classList.add("correct");
    wordElements[currentWordIndex].classList.remove("incorrect");
    correctWords++;
  } else {
    wordElements[currentWordIndex].classList.add("incorrect");
    wordElements[currentWordIndex].classList.remove("correct");
    incorrectWords++;
  }

  wordCount = typedWords.length;
  updateSpeed();
}

function updateSpeed() {
  let timeTaken = (new Date().getTime() - startTime) / 1000; // in seconds
  let wpm = Math.floor((wordCount / timeTaken) * 60);
  speedElement.textContent = `Speed: ${wpm} WPM`;
}

function endTest() {
  clearTimeout(timer); // Stop the timer
  let timeTaken = (new Date().getTime() - startTime) / 1000;
  let wpm = Math.floor((wordCount / timeTaken) * 60);
  
  timeElement.textContent = `Time: ${timeTaken}s`;
  finalSpeedElement.textContent = wpm;
  resultElement.style.display = "block";
  typingInput.disabled = true;
  startButton.disabled = false;
}

function restartTest() {
  resultElement.style.display = "none";
  sentenceElement.innerHTML = "Click 'Start' to begin typing!";
  typingInput.value = "";
  timeElement.textContent = "Time: 0s";
  speedElement.textContent = "Speed: 0 WPM";
}
