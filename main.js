/********* Selectors DOM *********/

//buttons
const btnStart = document.querySelector("#btn-start");
const btnTimer = document.querySelector("#btn-timer");
const btnPlayAgain = document.querySelector("#btn-play-again");

//question
const outputQuestion = document.querySelector("#question");
const wrapQuestion = document.querySelector("#wrap-question");

//answer
const answerInput = document.querySelector("#answer");
const wrapAnswer = document.querySelector("#wrap-answer");

//score
const coins = document.querySelector("#coins");
const wrapCurrentScore = document.querySelector("#wrap-current-score"); //div for currentScore
const outputFinalScore = document.querySelector("#final-score");

//check box-operator choices
const addition = document.querySelector("#addition");
const subtraction = document.querySelector("#subtraction");
const multiplication = document.querySelector("#multiplication");
const division = document.querySelector("#division");

//input-high-score
const highScoreName = document.querySelector("#high-score-name");

//high score list
const listHighScore = document.querySelector("#list-high-score");

//divs to be displayed at the end of each game
const wrapFinalScore = document.querySelector("#wrap-final-score");
const wrapFinalScoreHighScore = document.querySelector(
  "#wrap-final-score-highscore"
);

/** GLOBAL VARIABLES **/
let currentScore;
let rightAnswer;
let timeLeft = 10;
let timer;
let operator = "addition"; //by default 'addition', player can change it
let lowestHighScore = null; //for comparision with score after each game
let arrHighScore = [
  {
    name: "",
    score: null,
  },
  {
    name: "",
    score: null,
  },
  {
    name: "",
    score: null,
  },
];

/**** Renders New Question ****
 * Checks the operator variable
 * Sets different max-value depending on score and operator
 * Renders question
 * Outputs question to player
 */
const getNewQuestion = () => {
  let max;
  let num1;
  let num2;

  switch (operator) {
    case "addition":
      max = currentScore + 3;
      num1 = Math.floor(Math.random() * max);
      num2 = Math.floor(Math.random() * max);
      rightAnswer = num1 + num2;
      outputQuestion.textContent = `${num1} + ${num2}`;
      break;
    case "subtraction":
      max = currentScore + 3;
      num1 = Math.floor(Math.random() * max);
      num2 = Math.floor(Math.random() * max);
      let highNum = Math.max(num1, num2);
      let lowNum = Math.min(num1, num2);
      rightAnswer = highNum - lowNum;
      outputQuestion.textContent = `${highNum} - ${lowNum}`;
      break;
    case "multiplication":
      max = currentScore + 2;
      num1 = Math.floor(Math.random() * max);
      num2 = Math.floor(Math.random() * 11);
      rightAnswer = num1 * num2;
      outputQuestion.textContent = `${num1} x ${num2}`;
      break;
    case "division":
      max = currentScore + 2;
      num1 = Math.floor(Math.random() * 8) + 1;
      num2 = Math.floor(Math.random() * max) + 1;
      let product = num1 * num2;
      rightAnswer = product / num1;
      outputQuestion.textContent = `${product} / ${num1}`;
      break;
    case "random":
    case "division":
      function random_item(items) {
        return items[Math.floor(Math.random() * items.length)];
      }

      var items = [paul, Sarah, Peter];
      console.log(random_item(items));
      break;
      break;
  }
};

/**** Timer ****/

//updates timeLeft and displays to user
const updateTimer = (val) => {
  timeLeft += val;
  btnTimer.textContent = timeLeft;
};

const timerStop = () => {
  clearInterval(timer);
};

/* starts timer
 * when timeLeft is 0 it resets timer
 * and calls function isHighScore
 */
const startTimer = () => {
  timerStop();
  timer = setInterval(() => {
    updateTimer(-1);
    if (timeLeft === 0) {
      timerStop();
      isHighScore();
    }
  }, 1000);
};

/**** Update Score ****/
const updateScore = () => {
  currentScore++;
  btnStart.textContent = currentScore;
  coins.textContent += "🟡";
};

/*** Checks if answer is right
 * If right :
 * calls updateScore
 * calls updateTimer
 * calls to get new question
 * returns true to clear user textinput
 */
const isRightAnswer = (playerAnswer) => {
  if (playerAnswer == rightAnswer) {
    updateScore();
    updateTimer(+1);
    getNewQuestion();
    return true;
  }
};

//listens to players input and sends value to isRightAnswer
answerInput.addEventListener("keyup", () => {
  let playerAnswer = answerInput.value;
  if (isRightAnswer(playerAnswer) === true) {
    answerInput.value = "";
  }
});

/***** NEW GAME *****/
const newGame = () => {
  currentScore = 0;
  timeLeft = 10;
  displayNewGame();
  getNewQuestion();
  startTimer();
};

/**** HIGH SCORE ****/
/* Deletes previous high-score-list in DOM
 * Appending new high score to DOM
 */
const displayNewHighScore = function (newHighScore) {
  listHighScore.innerHTML = "";

  for (player of newHighScore) {
    const highScoreElement = document.createElement("li");
    const highScoreName = document.createElement("span");
    const highScoreScore = document.createElement("span");

    highScoreName.textContent = player.name + " ";
    highScoreScore.textContent = player.score;

    highScoreElement.appendChild(highScoreName);
    highScoreElement.appendChild(highScoreScore);
    listHighScore.appendChild(highScoreElement);
  }
};

/* Takes name from player
 * Pushes new name into arrHighScire
 * Sorts arrHighScore, highest to lowest score
 * Reduces length of arr to 3
 * Calls function displayNewHighScore with new array
 */
const updateHighScore = function (newName) {
  arrHighScore.push({ name: newName, score: currentScore });
  let newArrHighScore = arrHighScore.sort((b, a) => a.score - b.score);

  if (newArrHighScore.length > 3) {
    newArrHighScore.length = 3;
  }
  //updates variable lowest high Score
  lowestHighScore = newArrHighScore[2].score;
  //function call
  displayNewHighScore(newArrHighScore);
};

/* Checks if score is higer than lowest High Score*/
function isHighScore() {
  if (currentScore > lowestHighScore) {
    displayFinalScoreHighScore();
  } else {
    displayFinalScoreNormal();
  }
}

/*gets newName from name-input
 *updates highscore
 *calling function to reset the game
 */
function restartGame() {
  let newName = highScoreName.value;
  highScoreName.value = "";
  updateHighScore(newName);
  displayResetGame();
}

/**** DISPLAY FUNCTIONS ****/
/* 4 functions to display different scenarios of the game */

/* RESET GAME
 * Shown before each game starts
 * Shows and hides certains elements
 * Adds event-listener to the start-button
 */
function displayResetGame() {
  //show
  btnStart.style.display = "inline";
  btnStart.style.backgroundColor = "var(--green)";
  btnStart.textContent = "START";
  btnTimer.style.display = "inline";
  btnTimer.textContent = timeLeft;
  wrapAnswer.style.display = "block";
  wrapQuestion.style.display = "block";
  outputQuestion.textContent = "READY?";

  //hide
  wrapFinalScore.style.display = "none";
  wrapFinalScoreHighScore.style.display = "none";
  btnPlayAgain.style.display = "none";
  answerInput.value = "";
  coins.textContent = "";

  /* calls newGame when clicked
   * can only be clicked once */
  btnStart.addEventListener("click", newGame, { once: true });
}

/* NEW GAME -
 * To be shown during game */
function displayNewGame() {
  btnStart.textContent = currentScore; //display score on start-button
  answerInput.focus();
}

/* END OF GAME NORMAL
 * Shown when the player DONT get a high score
 * Shows and hides certains elements
 * Adds event-listener to the play again-button
 */
function displayFinalScoreNormal() {
  //show
  wrapFinalScore.style.display = "block";
  wrapFinalScore.style.marginTop = "5rem"; //changes margin of div
  outputFinalScore.textContent = currentScore;
  btnStart.style.backgroundColor = "var(--red)";
  btnStart.textContent = "GAME";
  btnTimer.textContent = "OVER";
  btnPlayAgain.style.display = "block";

  //hide
  coins.textContent = "";
  wrapAnswer.style.display = "none";
  wrapQuestion.style.display = "none";

  btnPlayAgain.addEventListener("click", restartGame);
}

/* END OF GAME HIGH SCORE
 * Shown when the player GET a high score
 * Shows and hides certains elements
 * Adds event-listener to the play again-button
 */
function displayFinalScoreHighScore() {
  //show
  wrapFinalScore.style.display = "block";
  wrapFinalScore.style.marginTop = "0";
  outputFinalScore.textContent = currentScore;
  wrapFinalScoreHighScore.style.display = "block";
  btnPlayAgain.style.display = "block";

  //hide
  coins.textContent = "";
  btnStart.style.display = "none";
  btnTimer.style.display = "none";
  wrapAnswer.style.display = "none";
  wrapQuestion.style.display = "none";

  btnPlayAgain.addEventListener("click", restartGame);
}

/*** EVENTLISTENER OPERATOR CHOICE ***/
addition.addEventListener("click", () => (operator = "addition"));
subtraction.addEventListener("click", () => (operator = "subtraction"));
multiplication.addEventListener("click", () => (operator = "multiplication"));
division.addEventListener("click", () => (operator = "division"));

/********* SITE LOAD  *********/
document.addEventListener("DOMContentLoaded", function () {
  displayResetGame();
});
