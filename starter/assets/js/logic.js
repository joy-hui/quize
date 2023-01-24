var startScreen = document.getElementById("start-screen");
var questionElement = document.getElementById("questions");
var endScreen = document.getElementById("end-screen");
var startbutton = document.getElementById("start");
var timer = document.getElementById("time");
var finalScoreEl = document.getElementById("final-score");
var initialsEl = document.getElementById("initials");
var submitButton = document.getElementById("submit");
var timecount = 76;
var finalScore;
var score = 0;
var currentQuestionIndex = 0;

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
  //var currentQuestion = question[currentQuestionIndex];

  // get current question object from array
  var question = questions[currentQuestionIndex];
  console.log(question);

  // update title with current question
  //var questionTitle = document.getElementById("question-title");
  questionTitle.textContent = question.title;

  for (var i = 0; i < question.choices; i++) {
    var choice = document.createElement("button");
        choice.setAttribute("class", "choice");
        choice.setAttribute("value", choice);
        choice.textContent = question.choices[i];
        questionChoices.appendChild(choice);
  
    // add an event listener to each choice
     // check the answer
     choice.addEventListener("click", function () {
      if (choice.value === questions[currentQuestionIndex].answer) {
        console.log(question[currentQuestionIndex].choices);
        questionAnswer.textContent = "Correctly";
        sfxRight.play();
        score++;
        currentQuestionIndex++;
      } else {
        questionAnswer.textContent = "Incorrectly";
        sfxWrong.play();
        score--;
        currentQuestionIndex++;
        var time = timer.textContent;
        timecount = time++;
      }
      return score;
    });
    // clear out any old question choices
    questionChoices.innerHTML = "";

  
  }
  
}

//function to end the quiz
function endQuiz() {
  timer.textContent = 0;
  endScreen.setAttribute("class", "start");
  questionElement.setAttribute("class", "hide");
  finalScore = score;
  finalScoreEl.textContent = finalScore;
}

//function to handle saving the high score
submitButton.addEventListener("click", function () {
  var initials = initialsEl.value;
  var highScoresList = JSON.parse(localStorage.getItem("highScores")) || [];
  highScoresList.push({ initials: initials, score: finalScore });
  highScoresList = highScoresList.sort((curr, next) => {
    if (curr.score < next.score) {
      return 1;
    } else if (curr.score > next.score) {
      return -1;
    } else {
      return 0;
    }
  });
  // set updated array to local storage
  localStorage.setItem("highScores", JSON.stringify(highScoresList));
  // go to highscores page
  window.location.href = "/starter/highscores.html";
});
