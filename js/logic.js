var startScreen = document.getElementById("start-screen");
var questionElement = document.getElementById("questions");
var endScreen = document.getElementById("end-screen");
var startbutton = document.getElementById("start");
var timer = document.getElementById("time");
var finalScoreEl = document.getElementById("final-score");
var initialsEl = document.getElementById("initials");
var submitButton = document.getElementById("submit");
var timecount = 60;
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

// click even inside of the retrieveQuestion function
function retrieveQustion() {
  if(currentQuestionIndex < 5){
    var questionTitle = document.getElementById("question-title");
    var questionChoices = document.getElementById("choices");
    questionChoices.innerHTML = "";
    //var currentQuestion = question[currentQuestionIndex];
    // get current question object from array
    var question = questions[currentQuestionIndex];
    //console.log(question);
    // update title with current question
    //var questionTitle = document.getElementById("question-title");
    questionTitle.textContent = question.title;

    for (var i = 0; i < question.choices.length; i++) {
      var choice = document.createElement("button");
      choice.setAttribute("class", "choice");
      choice.setAttribute("value", choice);
      choice.textContent = question.choices[i];
      //console.log(choice);
      questionChoices.appendChild(choice); // moved this into the loop bc we need to add them to the page after adding the event listener
      // add an event listener to each choice
      // check the answer
      choice.addEventListener("click", questionClick);
  }
  
      //choice.addEventListener("click", questionClick);

    // clear out any old question choices
    //questionChoices.innerHTML = "";
  }else {
    endQuiz();
    timer.innerHTML = "0";
    clearInterval(timerInterval);
  }
  // clear out any old question choices
  // questionChoices.innerHTML = "";
}

function questionClick(event) {
  // code that determines what happens when the question is clicked
  //console.log(questions[currentQuestionIndex].answer);
  var questionAnswer = document.getElementById("answer");
  var sfxRight = new Audio("assets/sfx/correct.wav");
  var sfxWrong = new Audio("assets/sfx/incorrect.wav");
  if (event.target.textContent === questions[currentQuestionIndex].answer) {
    //console.log(question[currentQuestionIndex].choices);
    questionAnswer.textContent = "Correctly";
    sfxRight.play();
    score += 10;
  } else {
    questionAnswer.textContent = "Incorrectly";
    sfxWrong.play();
    score -= 10;
    //var time = timer.textContent;
    timecount+=1;
    timer.textContent=timecount;
  }
  currentQuestionIndex++;
  //console.log(currentQuestionIndex);
  retrieveQustion();
  // clear out any old question choices
  // var questionChoices = document.getElementById("choices");
  // questionChoices.innerHTML = "";
}

// retrieve the question
// function retrieveQustion() {
//   var questionTitle = document.getElementById("question-title");
//   var questionChoices = document.getElementById("choices");
//   var questionAnswer = document.getElementById("answer");
//   var sfxRight = new Audio("assets/sfx/correct.wav");
//   var sfxWrong = new Audio("assets/sfx/incorrect.wav");
//   //var currentQuestion = question[currentQuestionIndex];

//   // get current question object from array
//   var question = questions[currentQuestionIndex];
//   console.log(question);

//   // update title with current question
//   //var questionTitle = document.getElementById("question-title");
//   questionTitle.textContent = question.title;

//   for (var i = 0; i < question.choices; i++) {
//     var choice = document.createElement("button");
//         choice.setAttribute("class", "choice");
//         choice.setAttribute("value", choice);
//         choice.textContent = question.choices[i];
//         questionChoices.appendChild(choice);

//     // add an event listener to each choice
//      // check the answer
//      choice.addEventListener("click", function () {
//       if (choice.value === questions[currentQuestionIndex].answer) {
//         console.log(question[currentQuestionIndex].choices);
//         questionAnswer.textContent = "Correctly";
//         sfxRight.play();
//         score++;

//       } else {
//         questionAnswer.textContent = "Incorrectly";
//         sfxWrong.play();
//         score--;
//         var time = timer.textContent;
//         timecount = time++;
//       }
//       return score;
//       currentQuestionIndex++;
//     });
//     // clear out any old question choices
//     questionChoices.innerHTML = "";

//   }

// }

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
  //console.log(initials);
  var highScoresList = JSON.parse(localStorage.getItem("highScores")) || [];
  highScoresList.push({ initials: initials, score: finalScore });
  //console.log(highScoresList);
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
  window.location.href =
    "file:///Users/huizhao/bootcamp/quize/highscores.html";
  //window.location.href = "/starter/highscores.html";
});
