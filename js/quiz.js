const questions = [
    {
        question: "Where will the 2023 Rugby World Cup be held?",
        answers: [
            { text: "Italy", correct: false},
            { text: "France", correct: true},  
            { text: "England and Wales", correct: false},
            { text: "Australia", correct: false},
        ]
    },
    {
        question: "Who get most ODI runs for Sri lanka?",
        answers: [
            { text: "Mahela Jayawardene", correct: false},
            { text: "Tillakaratne Dilshan", correct: false},
            { text: "Sanath Jayasuriya", correct: false},
            { text: "Kumar Sangakkara", correct: true},
        ]
    },
    {
        question: "How many squares in a chess board?",
        answers: [
            { text: "80", correct: false},
            { text: "64", correct: true},
            { text: "54", correct: false},
            { text: "72", correct: false},
        ]
    },
    {
        question: "How many players are in basketball each team?",
        answers: [
            { text: "6", correct: false},
            { text: "7", correct: false},
            { text: "8", correct: false},
            { text: "5", correct: true},
        ]
    },
    {
        question: "How many players are there in a Rugby team?",
        answers: [
            { text: "15 members", correct: true},
            { text: "16 members", correct: false},
            { text: "11 members", correct: false},
            { text: "20 members", correct: false},
        ]
    },
    {
        question: "Where was the last T20 World Cup held?",
        answers: [
            { text: "India", correct: false},
            { text: "Australia", correct: true},
            { text: "England", correct: false},
            { text: "South Africa", correct: false},
        ]
    },
    {
        question: "Who is the champion of 2023 FIDE world chess championship?",
        answers: [
            { text: "Magnus Carlsen", correct: false},
            { text: "Ian Nepomniachtchi", correct: false},
            { text: "Garry Kasparov", correct: false},
            { text: "Ding Liren", correct: true},
        ]
    },
    {
        question: "Who is the best basketball player in the world all time?",
        answers: [
            { text: "Michael Jordan", correct: false},
            { text: "Lebron James", correct: true},
            { text: "Magic Johnson", correct: false},
            { text: "Wilt Chamberlain", correct: false},
        ]
    },
    {
        question: "How long is a Rugby game?",
        answers: [
            { text: "100 minutes", correct: false},
            { text: "120 minutes", correct: false},
            { text: "80 minutes", correct: true},
            { text: "90 minutes", correct: false},
        ]
    },
    {
        question: "How long is the lunch break in Test Cricket?",
        answers: [
            { text: "20 minutes", correct: false},
            { text: "40 minutes", correct: true},
            { text: "30 minutes", correct: false},
            { text: "45 minutes", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer_btns");
const nextButton = document.getElementById("next_btn");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;  
let score = 0; 
let wrong=0;    
let timeLeft = 60;
let timerId;
let questionsAnswered=0;
let wronganswers=0;
let not_ans_ques=0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    wrong=0;
    timeLeft = 60;
    nextButton.innerHTML = "Next Question";  
    showQuestion();     
    startTimer();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];   
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;   

   
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");    
        button.innerHTML = answer.text;     
        button.classList.add("btn");         
        answerButtons.appendChild(button);      
        if(answer.correct){
            button.dataset.correct = answer.correct;       
        }
        button.addEventListener("click", selectAnswer);    
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);       
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;      
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");   
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect")      
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){      
            button.classList.add("correct");
        }
        button.disabled = true;     
    });
    nextButton.style.display = "block";     
    questionsAnswered++;
}

function showScore(){
    resetState();
    clearInterval(timerId);
    let timeTaken = 60 - timeLeft;
    let wrong = 10 - score;
    let message;
    if (score >= 8) {
        message = '<span style="color: green;">Excellent! You did great!</span>';
    } else if (score >= 5) {
        message = '<span style="color: blue;">Good job! You did well.</span>';
    } else {
        message = '<span style="color: red;">Better luck next time!</span>';
    }
    wronganswers=questionsAnswered-score;
    not_ans_ques=10-questionsAnswered;
    questionElement.innerHTML = `<h1><center>Quiz Completed! Quiz Result.</center></h1>
    <center>Total Questions: ${questions.length} <br/><br/>
    Questions Answered: ${questionsAnswered}<br/><br/>
    You Scored     : ${score}/10 <br/><br/>
    Correct Answers: ${score} <br/><br/>
    Wrong Answers  : ${wronganswers} <br/><br/>
    Questions Not Answered: ${not_ans_ques} <br/><br/>
    Time Taken     : ${timeTaken} seconds.<br/><br/>
    Performance    : ${message}</center>`;
    nextButton.innerHTML = "Exit";
    nextButton.style.display = "block";
    nextButton.removeEventListener("click", handleNextButton);
    nextButton.addEventListener("click", redirectToBackup);
}

function redirectToBackup() {
    window.location.href = "quiz_entry.html";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        window.location.href="quiz_entry.html";
    }
});

function startTimer(){
    timerId = setInterval(() => {
        timeLeft --;
        timerElement.innerHTML = `Time Left : ${timeLeft}`;
        if(timeLeft <= 0){
            clearInterval(timerId);
            showScore();
        }
    }, 1000);    
}

startQuiz();


