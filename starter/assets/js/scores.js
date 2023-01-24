var highscoresEl=document.getElementById("highscores");
var clearEl=document.getElementById("clear");

function populateHighScores() {
    // get array from storage, or initialize as empty array
    let highScoresList = JSON.parse(localStorage.getItem('highScores')) || [];
    // populate highscores list
    let list = '';
    highScoresList.forEach(score => {
        list = list + '<p>' + score.initials + '  :  ' + score.score + '</p>';
    });
    highscoresEl.innerHTML = list;
}

clearEl.addEventListener("click",function(){
    localStorage.clear();
    highscoresEl.innerHTML = "";
    populateHighScores();
})

populateHighScores();