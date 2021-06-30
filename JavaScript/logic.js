var time = questions.length * 15;
var currentQuestionIndex = 0;

var endScreen = document.querySelector("#end");
var finalScore = document.querySelector("#final-score");
var startScreen = document.querySelector("#start-screen");
var titleEl = document.querySelector("#questions-title")
var startBtn = document.querySelector("#start");
var submitBtn = document.querySelector("#submit");
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var questionChoices = document.querySelector("#choices");
var feedbackEl = document.querySelector("#feedback");
var initialsInput = document.querySelector("#initials");

var timerId;

// create start quiz function that will hide start screen and bring up questions/set time interval
function startQuiz() {
    startScreen.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");

    timerId = setInterval (function() {
        timeRun();
    }, 1000);

    timerEl.textContent = time;

    getCurrentQuestion();
};

// create time interval rules
function timeRun() {
    time--;
    timerEl.textContent = time;

    if (time === 0) endQuiz();
}

function getCurrentQuestion () {
    var currentQuestion = questions[currentQuestionIndex];
    
    titleEl.textContent = currentQuestion.title;
    questionChoices.innerHTML = "";

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", currentQuestion.choices[i]);

        choiceNode.textContent = i + 1 + ". " + currentQuestion.choices[i];

        questionChoices.appendChild(choiceNode);
    }
        questionChoices.children[0].addEventListener("click", function(event){
            answerClick(questionChoices.children[0]);
        });
        questionChoices.children[1].addEventListener("click", function(event){
            answerClick(questionChoices.children[1]);
        });
        questionChoices.children[2].addEventListener("click", function(event){
            answerClick(questionChoices.children[2]);
        });
        questionChoices.children[3].addEventListener("click", function(event){
            answerClick(questionChoices.children[3]);
        });
};


function answerClick(answerChoice) {
    console.log(answerChoice);
    if (answerChoice.textContent !== questions[currentQuestionIndex].answer) {
        time -= 10;
        feedbackEl.textContent = "Nope!";
        timerEl.textContent = time;
    } else {
        feedbackEl.textContent = "You got it!";
    }

    feedbackEl.setAttribute("class", "feedback")
    setInterval(function() {
        feedbackEl.setAttribute("class", "feedback hide")
    }, 1000);

    currentQuestionIndex++

    if (currentQuestionIndex === questions.length) {
        endQuiz();
    } else {
        getCurrentQuestion();
    }
};

// creating function to bring up end screen and create final score
function endQuiz () {

    // clear time interval
    clearInterval(timerId);
    timerEl.textContent = time;

    // remove end screen attribute (un-hide)
    endScreen.removeAttribute("class");

    // take time variable and set that equal to final score
    finalScore.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

function saveScores () {
    var initials = document.querySelector("#initials");

    if (initials.length > 3) {
        alert("Initials must be 3 characters or less!")
    }
    else {
        highScores = [];

        let recentScore = {initials: initials, score: time}
    

    highScores.push(recentScore);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = "highscores.html";
    }
}


submitBtn.addEventListener("click", saveScores)
startBtn.addEventListener("click", startQuiz)
