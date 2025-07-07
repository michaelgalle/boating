// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let questions = [];

// Initialize quiz
function initializeQuiz() {
  questions = quizData.questions;
  userAnswers = new Array(questions.length).fill(null);

  document.getElementById("total-questions").textContent =
    questions.length;
  document.getElementById("loading").classList.add("hidden");
  document.getElementById("quiz-content").classList.remove("hidden");

  displayQuestion();
  updateProgress();
}

// Display current question
function displayQuestion() {
  const question = questions[currentQuestionIndex];

  document.getElementById("question-number").textContent = `Question ${
    currentQuestionIndex + 1
  } of ${questions.length}`;
  document.getElementById("question-text").textContent =
    question.question;

  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.className = "option";
    optionElement.onclick = () => selectAnswer(index);

    const isSelected = userAnswers[currentQuestionIndex] === index;
    if (isSelected) {
      optionElement.classList.add("selected");
    }

    optionElement.innerHTML = `
              <input type="radio" name="question${currentQuestionIndex}" value="${index}" ${
      isSelected ? "checked" : ""
    }>
              <span>${option}</span>
          `;

    optionsContainer.appendChild(optionElement);
  });

  updateNavigationButtons();
}

// Select an answer
function selectAnswer(optionIndex) {
  userAnswers[currentQuestionIndex] = optionIndex;

  // Update visual selection
  const options = document.querySelectorAll(".option");
  options.forEach((option, index) => {
    option.classList.remove("selected");
    if (index === optionIndex) {
      option.classList.add("selected");
    }
  });

  // Update radio button
  const radioButton = document.querySelector(
    `input[value="${optionIndex}"]`
  );
  if (radioButton) {
    radioButton.checked = true;
  }
}

// Navigate to next question
function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
    updateProgress();
  } else {
    showResults();
  }
}

// Navigate to previous question
function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
    updateProgress();
  }
}

// Update navigation buttons
function updateNavigationButtons() {
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  prevBtn.disabled = currentQuestionIndex === 0;

  if (currentQuestionIndex === questions.length - 1) {
    nextBtn.textContent = "Finish Quiz";
  } else {
    nextBtn.textContent = "Next";
  }
}

// Update progress bar
function updateProgress() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  document.getElementById("progress-fill").style.width = progress + "%";
}

// Calculate and show results
function showResults() {
  score = 0;

  questions.forEach((question, index) => {
    if (userAnswers[index] === question.correctAnswer) {
      score++;
    }
  });

  document.getElementById("current-score").textContent = score;
  document.getElementById("quiz-content").classList.add("hidden");
  document.getElementById("results").classList.remove("hidden");

  const percentage = Math.round((score / questions.length) * 100);
  document.getElementById(
    "final-score"
  ).textContent = `${score}/${questions.length}`;

  let resultText = `You scored ${percentage}%! `;
  if (percentage >= 90) {
    resultText += "Excellent work! 🎉";
  } else if (percentage >= 70) {
    resultText += "Great job! 👍";
  } else if (percentage >= 50) {
    resultText += "Good effort! 👌";
  } else {
    resultText += "Keep practicing! 💪";
  }

  document.getElementById("results-text").textContent = resultText;

  // Show correct/incorrect answers
  showAnswerReview();
}

// Show answer review
function showAnswerReview() {
  const reviewContainer = document.createElement("div");
  reviewContainer.innerHTML =
    '<h3 style="margin: 20px 0;">Answer Review:</h3>';

  questions.forEach((question, index) => {
    const isCorrect = userAnswers[index] === question.correctAnswer;
    const userAnswer =
      userAnswers[index] !== null
        ? question.options[userAnswers[index]]
        : "Not answered";
    const correctAnswer = question.options[question.correctAnswer];

    const questionReview = document.createElement("div");
    questionReview.style.cssText = `
              margin-bottom: 15px;
              padding: 15px;
              border-radius: 10px;
              background: ${isCorrect ? "#d4edda" : "#f8d7da"};
              border: 1px solid ${isCorrect ? "#28a745" : "#dc3545"};
          `;

    questionReview.innerHTML = `
              <strong>Q${index + 1}:</strong> ${question.question}<br>
              <strong>Your answer:</strong> ${userAnswer}<br>
              <strong>Correct answer:</strong> ${correctAnswer}
              ${isCorrect ? " ✓" : " ✗"}
          `;

    reviewContainer.appendChild(questionReview);
  });

  document.getElementById("results").appendChild(reviewContainer);
}

// Restart quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = new Array(questions.length).fill(null);

  document.getElementById("current-score").textContent = "0";
  document.getElementById("results").classList.add("hidden");
  document.getElementById("quiz-content").classList.remove("hidden");

  // Remove answer review
  const reviewElements = document.querySelectorAll(
    "#results > div:last-child"
  );
  reviewElements.forEach((el) => el.remove());

  displayQuestion();
  updateProgress();
}

// Load quiz from JSON file (uncomment this function to use external JSON)

  async function loadQuizFromJSON(filename) {
      try {
          const response = await fetch(filename);
          const data = await response.json();
          return data;
      } catch (error) {
          console.error('Error loading quiz data:', error);
          return null;
      }
  }
  

// Start the quiz when page loads
window.onload = function () {
  // To load from external JSON file, uncomment this:
  
      loadQuizFromJSON('../private/js/quiz-data.json').then(data => {
          if (data) {
              quizData = data;
              initializeQuiz();
          } else {
              document.getElementById('loading').textContent = 'Error loading quiz data';
          }
      });
      
  // For demo purposes, using embedded data
  setTimeout(initializeQuiz, 1000); // Simulate loading time
};