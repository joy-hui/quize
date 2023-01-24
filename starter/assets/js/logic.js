var startScreen = document.getElementById("start-screen");
var questionElement = document.getElementById("questions");
var endScreen=document.getElementById("end-screen");
var startbutton = document.getElementById("start");
var timer = document.getElementById("time");
var finalScoreEl=document.getElementById("final-score");
var initialsEl=document.getElementById("initials");
var submitButton=document.getElementById("submit");
var timecount = 76;
var finalScore;
var score = 0;
//var currentindex;

// the screen change, start-screen hide, questions start
startbutton.addEventListener("click", function () {
  startScreen.setAttribute("class", "hide");
  questionElement.setAttribute("class", "start");
  var timerInterval = setInterval(function () {
    if (timecount > 0) {
      timecount--;
      //console.log(timecount);
      timer.textContent = timecount;
    } else {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
  retrieveQustion();
});

// retrieve the question
function retrieveQustion() {
  var questionTitle = document.getElementById("question-title");
  var questionChoices = document.getElementById("choices");
  var questionAnswer = document.getElementById("answer");
  var sfxRight = new Audio("assets/sfx/correct.wav");
  var sfxWrong = new Audio("assets/sfx/incorrect.wav");
  var currentQuestionIndex = 0;
  var currentQuestion = questions[currentQuestionIndex];

  for (var i = 0; i < 4; i++) {
    questionTitle.textContent = question[i].title;
    var li = document.createElement("li");
    li.textContent = question[i].choice[i];
    questionChoices.appendChild(li);

    // check the answer
    questionChoices.addEventListener("click", function () {
      if (question[0].choice === question[0].answer) {
        //console.log(question[0].choice);
        questionAnswer.textContent = "Correctly";
        sfxRight.play();
        score++;
      } else {
        questionAnswer.textContent = "Incorrectly";
        sfxWrong.play();
        score--;
        var time = timer.textContent;
        timecount = time++;
      }
      return score;
    });
  }
}

//function to end the quiz
function endQuiz() {
  timer.textContent = 0;
  endScreen.setAttribute("class","start"); 
  questionElement.setAttribute("class","hide");
  finalScore = score;
  finalScoreEl.textContent = finalScore;
}

//function to handle saving the high score
submitButton.addEventListener("click",function(){
  var initials = initialsEl.value;
  var highScoresList = JSON.parse(localStorage.getItem('highScores')) || [];
  highScoresList.push({ initials: initials, score: finalScore });
  highScoresList = highScoresList.sort((curr, next) => {
      if (curr.score < next.score) {
          return 1
      } else if (curr.score > next.score) {
          return -1
      } else {
          return 0
      }
  });
  // set updated array to local storage
  localStorage.setItem('highScores', JSON.stringify(highScoresList))
  // go to highscores page
  window.location.href = '/starter/highscores.html';
})
