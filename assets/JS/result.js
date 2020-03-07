let username = document.getElementById("username");
let saveScoreBtn = document.getElementById("saveScoreBtn");
let finalScore = document.getElementById("finalScore");


let mostRecentScore = localStorage.getItem("mostRecentScore");
finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;  //if something in the username box disable the button
});

let highScores = JSON.parse(localStorage.getItem("highScores")) || []; // if high score is empty it will put equal to empty array
let MAX_HIGH_SCORES = 5;


saveScoreBtn.addEventListener("click", () => { 
  event.preventDefault();  //prevents the form to perform its default action which is going to a different page with a link above

  let score = {
    score: mostRecentScore,
    name: username.value
  };
  highScores.push(score);  //adds the new score to the array of scores
  highScores.sort((a, b) => b.score - a.score);  //function for Java scrip which you can define your sortation: if the "b" score is higher than "a" score it will put b before a.
  highScores.splice(5);  // it will take the bottom item - 5th index out 

  localStorage.setItem("highScores", JSON.stringify(highScores)); 
  window.location.assign("./highscores.html");
});
 