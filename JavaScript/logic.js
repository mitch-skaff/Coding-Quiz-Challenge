var time = questions.length * 15;
var currentQuestionIndex = 0;

var endScreen = document.querySelector("#end");
var finalScore = document.querySelector("#final-score");
var startScreen = document.querySelector("#start-screen");
var titleEl = document.querySelector("questions-title")
var startBtn = document.querySelector("#start");
var submitBtn = document.querySelector("#submit");
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var questionChoices = document.querySelector("#choices");
var feedbackEl = document.querySelector("#feedback");

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

// creating function to bring up end screen and create final score
function endQuiz () {

    // clear time interval
    clearInterval(timerId);
    timerEl.textContent = time;

    // remove end screen attribute (un-hide)
    endScreen.removeAttribute("class");

    // take time variable and set that equal to final score
    finalScore.textContent = time;
}

function getCurrentQuestion () {
    var currentQuestion = questions[currentQuestionIndex];
    
    questionsEl.textContent = currentQuestion.title;
    questionChoices.textContent = ("");

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", currentQuestion.choices[i]);

        choiceNode.textContent = i + 1 + ". " + currentQuestion.choices[i];

        questionChoices.appendChild(choiceNode);
    }
};





startBtn.addEventListener("click", startQuiz);