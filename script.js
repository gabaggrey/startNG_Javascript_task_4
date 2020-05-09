const options = document.querySelector(".options").children;
const answerTrackerContainer = document.querySelector(".answers-tracker");
const questionNumberSpan = document.querySelector(".question-num-value");
const totalQuestionSpan = document.querySelector(".total-questions");
const correctAnswerSpan = document.querySelector(".correct-answer");
const totalQuestionSpan2 = document.querySelector(".total-question2");
const percentage = document.querySelector(".percentage");
const question = document.querySelector(".question");
const op1 = document.querySelector(".option1");
const op2 = document.querySelector(".option2");
const op3 = document.querySelector(".option3");
const op4 = document.querySelector(".option4");
let questionIndex;
let index = 0;
let myArray = [];
let testArray = [];
let score = 0;

const questions = [
  {
    q: 'How do you call a function named "myFunction" ? ',
    options: [
      "myFunction()",
      "call myFunction()",
      "call function myFunction()",
      "all the above",
    ],
    answer: 0,
  },
  {
    q: "How to write an iF statement in Javascript ? ",
    options: ["if i == 5 then", "if (i == 5)", "if i = 5", "if i = 5 then"],
    answer: 1,
  },
  {
    q: "How does a FOR loop start ? ",
    options: [
      "for (i = 0; i <= 5)",
      "for (i <= 5; i++)",
      "for i = 1 to 5",
      "for (i = 0; i <= 5; i++)",
    ],
    answer: 3,
  },
  {
    q: "How do you create an array in Javascript ? ",
    options: [
      "var arrayName = []",
      "var arrayName = {}",
      "var [] arrayName = ()",
      "none of the above",
    ],
    answer: 0,
  },
  {
    q: "How do you create an object in Javascript ? ",
    options: [
      "var objName = []",
      "var objName = {}",
      "var [] objName = ()",
      "all the above",
    ],
    answer: 1,
  },
];

totalQuestionSpan.innerHTML = questions.length;

function load() {
  questionNumberSpan.innerHTML = index + 1;
  question.innerHTML = questions[questionIndex].q;
  op1.innerHTML = questions[questionIndex].options[0];
  op2.innerHTML = questions[questionIndex].options[1];
  op3.innerHTML = questions[questionIndex].options[2];
  op4.innerHTML = questions[questionIndex].options[3];
  index++;
}

function check(element) {
  if (element.id == questions[questionIndex].answer) {
    element.classList.add("correct");
    updateAnswerTracker("correct");
    score++;
    // console.log("score : " + score);
  } else {
    element.classList.add("wrong");
    updateAnswerTracker("wrong");
  }

  disableOptions();
}

function disableOptions() {
  for (let i = 0; i < options.length; i++) {
    options[i].classList.add("disabled");

    if (options[i].id == questions[questionIndex].answer) {
      options[i].classList.add("correct");
    }
  }
}

function enableOptions() {
  for (let i = 0; i < options.length; i++) {
    options[i].classList.remove("disabled", "correct", "wrong");
  }
}

function validate() {
  if (!options[0].classList.contains("disabled")) {
    alert("Please select an option");
  } else {
    enableOptions();
    randomQuestion();
  }
}

function next() {
  validate();
}

function randomQuestion() {
  let randomNumber = Math.floor(Math.random() * questions.length); 
  let hitDuplicate = 0;

  if (index == questions.length) {
    
    quizOver();
      
  } else {

    if (myArray.length > 0) {
      for (let i = 0; i < myArray.length; i++) {
        if (myArray[i] == randomNumber) {
          hitDuplicate = 1;
          break;
        }
      }
      if (hitDuplicate == 1) {
        randomQuestion();
      } else {
        questionIndex = randomNumber;
        load();
        testArray.push(questionIndex);
      }
    }
    if (myArray == 0) {
      questionIndex = randomNumber;
      this.load();
    //   testArray.push(questionIndex);
    }
  }
  myArray.push(questionIndex);
}

function answerTracker() {
  for (let i = 0; i < questions.length; i++) {
    const div = document.createElement("div");
    answerTrackerContainer.appendChild(div);
  }
}

function updateAnswerTracker(className) {
  answerTrackerContainer.children[index - 1].classList.add(className);
}

function quizOver() {
  document.querySelector(".quiz-over").classList.add("show");
  correctAnswerSpan.innerHTML = score;
  totalQuestionSpan2.innerHTML = questions.length;
  percentage.innerHTML = (score / questions.length) * 100 + "%";
}

function tryAgain() {
  window.location.reload;
}

window.onload = function () {
  randomQuestion();
  answerTracker();
};
