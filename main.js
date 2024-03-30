/**** Selectors ****/

//timer and start timer
const btnStart = document.querySelector("#btn-start");
const spanStart = document.querySelector("#start");
const btnTimer = document.querySelector("#btn-timer");
const spanTimer = document.querySelector("#timer");

//question
const outputQuestion = document.querySelector("#question");

//operator choice
const addition = document.querySelector("#addition");
const subtraction = document.querySelector("#subtraction");
const multiplication = document.querySelector("#multiplication");
const division = document.querySelector("#division");

//input-fields
const answerInput = document.querySelector("#answer");
const name = document.querySelector("#high-score-name");

//score
const outputScore = document.querySelector("#current-score");

//high score list
const highScore1 = document.querySelector("#high-score-1");
const highScore2 = document.querySelector("#high-score-2");
const highScore3 = document.querySelector("#high-score-3");

/***** Check Operator Choice ****/
let operator = "addition";

addition.addEventListener("click", () => (operator = "addition"));
subtraction.addEventListener("click", () => (operator = "subtraction"));
multiplication.addEventListener("click", () => (operator = "multiplication"));
division.addEventListener("click", () => (operator = "division"));

const checkOperator = () => {
  let typeOfGame = operator;
  switch (typeOfGame) {
    case "addition":
      return "addition";
      break;
    case "subtraction":
      return "subtraction";
      break;
    case "multiplication":
      return "multiplication";
      break;
    case "division":
      return "division";
      break;
    default:
      return "addition";
  }
};

/************* GAME **************/
let outputTime = 10;
let timepassed = 0;
let timer = null;
let startTime;

let realAnswer;
let score = 0;

const startTimer = () => {
  startTime = Date.now() - timepassed;
  timer = setInterval(function () {
    timepassed = Date.now() - startTime;
    outputTime -= 1;
    spanTimer.textContent = outputTime;
    if (outputTime <= 0) {
      window.clearInterval(timer);
      spanTimer.textContent = "GAME";
      spanStart.textContent = "OVER";
    }
  }, 1000);
};

//game 
let typeOfGame = checkOperator();


if ((typeOfGame = "addition")) {
  console.log(typeOfGame);
}
let rightAnswer;
  let max = 11;
  //question depending on operator
  const questionLoop = () => {
    startTimer();
    let num1 = Math.floor(Math.random() * max);
    let num2 = Math.floor(Math.random() * max);
    rightAnswer = num1 + num2;
    outputQuestion.textContent = `${num1} + ${num2}`;
  };


//otherwise same

//checkAnswer
const checkAnswer = (playerAnswer) => {
  console.log(playerAnswer);
  console.log(rightAnswer);
  if (playerAnswer == rightAnswer) {
    score ++;
    // btnTimer.style.backgroundcolor = 'white';
    // outputTime += 5;
    outputScore.textContent = score;
    questionLoop();
    return true;
  }
};

/**** Event Listeners ****/

answerInput.addEventListener("keyup", () => {
  let playerAnswer = answerInput.value;
  if (checkAnswer(playerAnswer)) {
    answerInput.value = '';
  };
});

btnStart.addEventListener("click", questionLoop);
