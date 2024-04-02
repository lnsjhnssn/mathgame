/********* Selectors DOM *********/

const btnStart = document.querySelector("#btn-start"); //start button
const btnTimer = document.querySelector("#btn-timer"); //timer

const outputQuestion = document.querySelector("#question"); //question-field
const coins = document.querySelector("#coins"); //coins-points

const wrapCurrentScore = document.querySelector("#wrap-current-score");

//operator choice-field
const addition = document.querySelector("#addition");
const subtraction = document.querySelector("#subtraction");
const multiplication = document.querySelector("#multiplication");
const division = document.querySelector("#division");

//input-fields for answer and field for question
const answerInput = document.querySelector("#answer");
const highScoreName = document.querySelector("#high-score-name");
const wrapAnswer = document.querySelector("#wrap-answer");
const wrapQuestion = document.querySelector("#wrap-question");

//high score list
const listHighScore = document.querySelector("#list-high-score");

//fields to be displayed at the end of each game
const outputFinalScore = document.querySelector("#final-score");
const wrapFinalScore = document.querySelector("#wrap-final-score");
const btnPlayAgain = document.querySelector("#btn-play-again");
const textIfHighScore = document.querySelector('#text-if-high-score');
const textNotHighScore = document.querySelector('#text-if-not-high-score');

const wrapFinalScoreHighScore = document.querySelector(
  "#wrap-final-score-highscore"
);

/** GLOBAL VARIABLES **/

let timeLeft;
let score;
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

/************* NEW GAME **************/

const newGame = () => {
  
  score = 0;
  timeLeft = 10;
  let rightAnswer;

  btnStart.style.backgroundColor = 'var(--blue)';
  btnStart.textContent = score;

  /**** Timer ****/
  let timer;

  const timerStop = () => {
    clearInterval(timer);
  };

  const updateTimer = (val) => {
    timeLeft += val;
    btnTimer.textContent = timeLeft;
  };

  const startTimer = () => {
    timerStop();
    timer = setInterval(() => {
      updateTimer(-1);
      console.log(timeLeft);
      if (timeLeft === 0) {
        timerStop();
        isHighScore();
      }
    }, 1000);
  };

  /**** Function to render new question ****/
  const getNewQuestion = () => {
    let max;
    let num1;
    let num2;

    //checks the operator-variable and renders new question
    switch (operator) {
      case "addition":
        max = score + 3;
        num1 = Math.floor(Math.random() * max);
        num2 = Math.floor(Math.random() * max);
        rightAnswer = num1 + num2;
        outputQuestion.textContent = `${num1} + ${num2}`;
        break;
      case "subtraction":
        max = score + 3;
        num1 = Math.floor(Math.random() * max);
        num2 = Math.floor(Math.random() * max);
        let highNum = Math.max(num1, num2);
        let lowNum = Math.min(num1, num2);
        rightAnswer = highNum - lowNum;
        outputQuestion.textContent = `${highNum} - ${lowNum}`;
        break;
      case "multiplication":
        max = score + 2;
        num1 = Math.floor(Math.random() * max);
        num2 = Math.floor(Math.random() * 11);
        rightAnswer = num1 * num2;
        outputQuestion.textContent = `${num1} x ${num2}`;
        break;
      case "division":
        max = score + 2;
        num1 = Math.floor(Math.random() * 8) + 1;
        num2 = Math.floor(Math.random() * max) + 1;
        let product = num1 * num2;
        rightAnswer = product / num1;
        outputQuestion.textContent = `${product} / ${num1}`;
        break;
    }
  };

  /**** CHECK ANSWER, UPDATE SCORE AND GET NEW QUESTION ****/

  const updateScore = () => {
    score++;
    btnStart.textContent = score;
  };

  //checks if answer is right, updates score and timer
  const isRightAnswer = (playerAnswer) => {
    if (playerAnswer == rightAnswer) {
      updateScore();
      coins.textContent += "🟡";
      updateTimer(+1);
      answerInput.value = "";
      getNewQuestion();
    }
  };

  //listens to players input and sends value to isRightAnswer
  answerInput.addEventListener("keyup", () => {
    isRightAnswer(answerInput.value);
  });

  //Functions to be called in beginning of game ->
  answerInput.focus();
  getNewQuestion();
  startTimer();
};


/****** HIGH SCORE *****/ 

const displayNewHighScore = function (arr) {
  
  listHighScore.innerHTML = "";

  for (i of arr) {
    const highScoreElement = document.createElement("li");
    const highScoreName = document.createElement("span");
    const highScoreScore = document.createElement("span");

    highScoreName.textContent = i.name + " ";
    highScoreScore.textContent = i.score;

    highScoreElement.appendChild(highScoreName);
    highScoreElement.appendChild(highScoreScore);
    listHighScore.appendChild(highScoreElement);
  }
};

const updateHighScore = function (newName) {
  arrHighScore.push({ name: newName, score: score });

  let sortedArrHighScore = arrHighScore.sort((b, a) => a.score - b.score);

  if (sortedArrHighScore.length > 3) {
    sortedArrHighScore.length = 3;
  }

  //get lowest number in high Score and store it to the variable
  lowestHighScore = sortedArrHighScore[2].score;

  displayNewHighScore(sortedArrHighScore);
};

function isHighScore() {
  if (score > lowestHighScore) {
    displayFinalScoreHighScore();
  } else {
    displayFinalScoreNormal();
  }
}

//get name from inputfield and updates highscore and resets the game
function getInputName() {
  let newName = highScoreName.value;
  updateHighScore(newName);
  displayResetGame();
}

/*********** DISPLAY ***********/
/* Three functions to display different scenarios of the game */

function displayResetGame() {
  // outputCurrentScore.textContent = 0;
  coins.textContent = '';

  btnStart.style.display = "inline";
  btnStart.textContent = "START";
  btnStart.style.backgroundColor = "var(--green)";

  btnTimer.style.display = "inline";
  btnTimer.textContent = "10";

  outputQuestion.textContent = "READY?";

  wrapFinalScore.style.display = "none";
  wrapFinalScoreHighScore.style.display = "none";
  btnPlayAgain.style.display = "none";

  // wrapCurrentScore.style.display = "block";
  wrapAnswer.style.display = "block";
  wrapQuestion.style.display = "block";

  answerInput.value = "";

  btnStart.addEventListener("click", newGame, { once: true });
}

function displayFinalScoreNormal() {
  outputFinalScore.textContent = score;

  // wrapCurrentScore.style.display = "none";
  coins.textContent = '';
  wrapAnswer.style.display = "none";
  wrapQuestion.style.display = "none";
  // textIfHighScore.style.display = 'none';

  btnStart.style.backgroundColor = "var(--red)";
  btnStart.textContent = "GAME";
  btnTimer.textContent = "OVER";

  wrapFinalScore.style.display = "block";
  wrapFinalScore.style.marginTop = '5rem';
  btnPlayAgain.style.display = "block";
  // textNotHighScore.style.display = 'inline';

  btnPlayAgain.addEventListener("click", getInputName);
}

function displayFinalScoreHighScore() {
  wrapFinalScore.style.display = "block";
  wrapFinalScore.style.marginTop = '0';
  outputFinalScore.textContent = score;

  coins.textContent = '';
  btnStart.style.display = "none";
  btnTimer.style.display = "none";
  wrapAnswer.style.display = "none";
  wrapQuestion.style.display = "none";
  // textNotHighScore.style.display = 'none';

  wrapFinalScoreHighScore.style.display = "block";
  btnPlayAgain.style.display = "block";
  // textIfHighScore.style.display = 'inline';

  btnPlayAgain.addEventListener("click", getInputName);
}


/*** Eventlisteners for operator-choice ***/
addition.addEventListener("click", () => (operator = "addition"));
subtraction.addEventListener("click", () => (operator = "subtraction"));
multiplication.addEventListener("click", () => (operator = "multiplication"));
division.addEventListener("click", () => (operator = "division"));

/********* SITE LOAD  *********/

displayResetGame();
