const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Lisbon", correct: false }
        ]
    },
    {
        question: "Who is the CEO of Tesla?",
        answers: [
            { text: "Jeff Bezos", correct: false },
            { text: "Elon Musk", correct: true },
            { text: "Bill Gates", correct: false },
            { text: "Tony Stark", correct: false }
        ]
    },
    // Add more questions here
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const ownerSection = document.getElementById('owner-section');
const ownerPasswordInput = document.getElementById('owner-password');
const viewScoreButton = document.getElementById('view-score-btn');
const ownerScoreElement = document.getElementById('owner-score');

let currentQuestionIndex, shuffledQuestions;
let score = 0;
const ownerPassword = "yourpassword"; // Set your owner password here

function startQuiz() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    hideOwnerSection(); // Hide the owner section initially
    nextButton.classList.add('hide');
    restartButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.classList.add('hide');
        restartButton.classList.remove('hide');
        showOwnerSection(); // Show the owner section after quiz completion
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showOwnerSection() {
    ownerSection.classList.remove('hide');
}

function hideOwnerSection() {
    ownerSection.classList.add('hide');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

restartButton.addEventListener('click', startQuiz);

viewScoreButton.addEventListener('click', () => {
    if (ownerPasswordInput.value === ownerPassword) {
        ownerScoreElement.classList.remove('hide');
        ownerScoreElement.innerText = `Owner Score: ${score}`;
    } else {
        alert("Incorrect password");
    }
});

startQuiz();
