// Pseudocode
// Add HTML and CSS for layout
// Not much html, mostly classes/IDs for content to be added in javascript
// 5 Questions: Create arrays for questions and answers
// Global variables, need getElementById (assign a variable to an HTML element [target elements in the DOM])
// Functions: timer, start quiz, questions, select answer, right/wrong, save score, show high score
// Add for loop (?)
// .addEventListener (click, start game, view high score, submit initials, restart, clear score)
// Timer goes down 10 ADDITIONAL seconds when you answer incorrectly, timer is continuous

var questions = [
    {
        question: 'What is the correct JavaScript syntax to change the content of the following HTML element? <p id="demo">This is a demonstration.</p>',
        answers: [
            { text: 'document.getElement("p").innerHTML = "Hello World!";', correct: false },
            { text: 'document.getElementById("demo").innerHTML = "Hello World!";' , correct: true },
            { text: '#demo.innerHTML = "Hello World!";', correct: false },
            { text: 'document.getElementByName("p").innerHTML = "Hello World!";', correct: false }
        ]
    },
    {
        question: "How to write an IF statement in JavaScript?",
        answers: [
            { text: "if i = 5", correct: false },
            { text: "if i = 5 then", correct: false },
            { text: "if (i == 5)", correct: true },
            { text: "if i == 5 then", correct: false }
        ]
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        answers: [
            { text: 'var colors = "red", "green", "blue"', correct: false },
            { text: 'var colors = ["red", "green", "blue"]', correct: true },
            { text: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")', correct: false },
            { text: 'var colors = (1:"red", 2:"green", 3:"blue")', correct: false }
        ]
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        answers: [
            { text: "+", correct: false },
            { text: "=", correct: true },
            { text: ">", correct: false },
            { text: "-", correct: false }
        ]
    },
    {
        question: "How does a FOR loop start?",
        answers: [
            { text: "for i = 1 to 5", correct: false },
            { text: "for (i = 0; i <= 5)", correct: false },
            { text: "for (i <= 5; i++)", correct: false },
            { text: "for (i = 0; i <= 5; i++)", correct: true }
        ]
    },
 ];

 // In each answers array [], the text property represents the content of a possible answer to the question.
 // The 'correct:' property is a boolean value that will be used later to create a function to let the user know whether their answer was correct/incorrect, and also record their high score.
 
 // Start the quiz with a timer set to 75. Timer left also will be the final score minus 10 sec for every wrong answer.
 // Global variables, most of which are pulled from the html using .getElementByID
 
 var timeLeft = 75;
 var timerID;
 var timerEl = document.getElementById("timer");
 var startButton = document.getElementById("start-btn");
 var nextButton = document.getElementById("next-btn");
 var questionContainerEl = document.getElementById("question-container");
 var startContainerEl = document.getElementById("start-container");
 var questionEl = document.getElementById("question");
 var answerButtonsEl = document.getElementById("answer-buttons");
 var checkAnswerEl = document.getElementById("check-answer");
 var viewHighScores = document.getElementById("highscores-link");
 var submitButton = document.getElementById("submit-btn");
 var clearScoreButton = document.getElementById("clear-btn");
 var initialsField = document.getElementById("player-name");
 var restartButton = document.getElementById("restart-btn");
 var scoreField = document.getElementById("player-score");
 var scores = JSON.parse(localStorage.getItem("scores")) || [];

// JSON (JavaScript Object Notation) parse converts JSON string into a Javascript object. 
// JSON strings consist of key-value pairs enclosed in curly brackets

var shuffledQuestions, currentQuestionIndex;

// Empty global variables that will be given a value in a local function

// Start button - trigger the first question and next button to display, calling function startGame
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
   currentQuestionIndex++
   setNextQuestion()
});

// Timer counts down once game is started, will show count down, if timer runs out, save current score
function timeTick() {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
        saveScore();
    }
 }

 // Start Quiz- function startGame (which we called earlier)
function startGame() {
    timerID = setInterval(timeTick, 1000);
    startContainerEl.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hide");
    // Timer will start as soon as start button is clicked
    timeTick();
    setNextQuestion();
 };
 
 // Without further code, when you click 'Start Quiz' you will see 'Question' as a header and four buttons labeled 'Answer 1, Answer 2, Answer 3, Answer 4'. User is unable to click an answer, but hover works.

 // Go to next question, calling function resetState which still needs to be defined
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
 };

// Display questions with function showQuestions calling variable question array that was defined at the top of the code. 
function showQuestion(question) {
   questionEl.innerText = question.question
   question.answers.forEach(answer => {
       var button = document.createElement("button")
       button.innerText = answer.text
       button.classList.add("btn")
       if (answer.correct) {
           button.dataset.correct = answer.correct
       }
       button.addEventListener("click", selectAnswer)
       answerButtonsEl.appendChild(button)
   })
};

 // Reset state function (called in setNextQuestion function)
function resetState() {
    //clearStatusClass(document.body)
    nextButton.classList.add("hide")
    checkAnswerEl.classList.add("hide")
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
            (answerButtonsEl.firstChild)
    }
 };
 