var correctSound = document.querySelector("#correct");
var wrongSound = document.querySelector("#wrong");
let question = document.querySelector("#question");
let choices = Array.from(document.getElementsByClassName("choice-text"));   /*HTML collection or kinda of a node list - array makes it a array of choises*/
let progressText = document.querySelector("#progressText");
let scoreText = document.querySelector("#score");
let progressBarFull = document.querySelector("#progressBarFull");
let loader = document.querySelector("#loader");
let game = document.querySelector("#game");
let currentQuestion = {};  /*object*/
let acceptingAnswers = false;  /*is set to false so they can't answer before everything loaded, creating delays*/
let score = 0;  
let questionCounter = 0;  /*tells us what question we are on*/
let availableQuesions = [];    /*copy of full question set, we will take questions out of this as we use them so we always have unique question*/
let questions = [];

let totalSeconds = 0;
let secondsElapsed = 0;
let interval;

fetch(
  "https://opentdb.com/api.php?amount=30&category=18&difficulty=medium&type=multiple"
)
  .then(res => {
    return res.json();   //gets the body from the source and puts in a json
  })
  .then(loadedQuestions => { //then json will be referred to as loaded questions
    // questions = loadedQuestions;
    questions = loadedQuestions.results.map(loadedQuestion => {
      let formattedQuestion = {
        question: loadedQuestion.question
      };

      let answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });

      return formattedQuestion;
    });

    startGame();
  })
  .catch(err => {   //error scenario, if we give wrong path to the file it'll give an error so we know whats going on. 
    console.error(err);
  });

//CONSTANTS
let BONUS_POINT = 20;
let MAX_QUESTIONS = 20;

//****** ***********/
//FUNCTIONS  - START
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];  /*takes a full copy of available questions to available questions array*/
  getNewQuestion();
  game.classList.remove("hidden");  //this will only allow the quiz page appear if a new question has been loaded otherwise it'll show an empty place
  loader.classList.add("hidden");
  startTimer();
};
//***************** */


//****************Start of getting a new question  ********** */
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/result.html");
  }
  questionCounter++;  //It'll start with question 1 
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;  //instead of progressText.innerText = questionCounter + "/" + MAX_QUESTIONS;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;



      //***************** * Loading random question from pool of questions and update the availabe question list
  let questionIndex = Math.floor(Math.random() * availableQuesions.length);   //get a randome question from the available questions
  currentQuestion = availableQuesions[questionIndex];  //take the random index from the available questions*/
  question.innerText = currentQuestion.question;  //placing the question property from the current question in to the innerText of the question in quiz html 
  choices.forEach(choice => {
    let number = choice.dataset["number"]; // getting access to those number properties, this is how to access to custom atributies
    choice.innerText = currentQuestion["choice" + number];  //getting choice number and using that getting choice1 to 4 and putting them in to choice innerText
  });

  availableQuesions.splice(questionIndex, 1);  //gives the index of the question that has to come out of available questions and then splice that one out
  acceptingAnswers = true;  //now the user can asnwer
};
//****************End of getting a new question  ********** */

//***************** */ Event Listener for the user when answers
choices.forEach(choice => {   //creating an event listener for an array instead of creating event listener each one
  choice.addEventListener("click", event => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;  //this will not allow the user to keep answering- user can only answer if new question has been loaded
    let selectedChoice = event.target;
    let selectedAnswer = selectedChoice.dataset["number"];

      //***************** */ check if users answer is correct and increment score 
    let classToApply = "incorrect";
      if (selectedAnswer == currentQuestion.answer) {
        classToApply = "correct";
        playCorrectAudio();
        incrementScore(BONUS_POINT);
      }
      if (classToApply == "incorrect") {
        secondsElapsed +=10;
        playWrongAudio();
      }
    

      //add a class that makes the answer green or red and then removes the red or green color after 1sec
    selectedChoice.parentElement.classList.add(classToApply);  //adds the class
    setTimeout(() => {   //runs a timer of 1000ms before removing class/color on the answer
      selectedChoice.parentElement.classList.remove(classToApply);  //removes the class
      getNewQuestion();
    }, 2500);
  });
});
//***************** */ END event for the user when answers


//***Adding score when getting answers correctly */
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};



function getFormattedMinutes() {
  var secondsLeft = totalSeconds - secondsElapsed;
  var minutesLeft = Math.floor(secondsLeft / 60);
  var formattedMinutes;

  if (minutesLeft < 10) {
    formattedMinutes = "0" + minutesLeft;
  } else {
    formattedMinutes = minutesLeft;
  }
  return formattedMinutes;
}

function getFormattedSeconds() {
  var secondsLeft = (totalSeconds - secondsElapsed) % 60;
  var formattedSeconds;

  if (secondsLeft < 10) {
    formattedSeconds = "0" + secondsLeft;
  } else {
    formattedSeconds = secondsLeft;
  }
  return formattedSeconds;
}

function setTime() {
  let minutes= 1.5;
  clearInterval(interval);
  totalSeconds = minutes * 60;
}

function renderTime() {
  var A = getFormattedMinutes();
  var B = getFormattedSeconds();
  progressTText.innerText = `Time ${A}:${B}`;  //instead of progressText.innerText = questionCounter + "/" + MAX_QUESTIONS;
  //Update the progress bar
  progressBarTime.style.width = `${(secondsElapsed / totalSeconds) * 100}%`;
  if (secondsElapsed >= totalSeconds) {
    stopTimer();
  }
}

function startTimer() {
  setTime();
  interval = setInterval(function() {
    secondsElapsed++;
    renderTime();
  }, 1000);
}

function stopTimer() {
  secondsElapsed = 0;
  setTime();
  localStorage.setItem("mostRecentScore", score);
  //go to the end page
  return window.location.assign("/result.html");
}

function playCorrectAudio() { 
  correctSound.play(); 
} 

function playWrongAudio() { 
  wrongSound.play(); 
} 