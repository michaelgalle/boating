// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let total = 0;
let percentage = 0;
let userAnswers = [];
let questions = [];
let quizNumber;

// Initialize quiz
function initializeQuiz(quizData) {
  //console.log("Quiz data loaded:", quizData);   // Testing
  // From quizData object select a random quiz number [1-5] from the quiz array
  quizNumber = Math.floor(Math.random() * quizData["quiz"].length);
  //console.log("Selected quiz number:", quizNumber + 1); // Testing  

  questions = quizData["quiz"][quizNumber].questions;
  //console.log("Loaded questions:", questions);      // testing
  userAnswers = new Array(questions.length).fill(null);

  //document.getElementById("total-questions").textContent = questions.length;
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

  // Fetch the score from the back end server as soon as showResults() is called
  fetch('/api/submit-quiz', {
    method: 'POST',   // Use POST method to submit answers  
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({  // Send user answers and quiz number to the server
      answers: userAnswers,
      quizNumber: quizNumber
    })
  })
    .then(response => { 
      // Check if the HTTP response was successful (status 200-299)
      if (!response.ok) {
        // If not successful, throw an error to trigger the .catch() block
        // You can also get more details from the response here
        return response.text().then(errorMessage => { // Try to get text, in case it's not JSON
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
        });
      }
      // If successful, parse the response as JSON
      // Note: If the server returns a non-JSON response, this will throw an error
      return response.json();    
    })  
    .then(data => {
      // Assuming the server returns the score in the response
      score = data.score;  // Use the score returned from the server
      total = data.total;  // Total number of questions
      percentage = data.percentage;  // Percentage score

      //console.log("Score received from server:", score); // Debugging log
      //console.log("Total questions:", total); // Debugging log
      //console.log("Percentage:", percentage); // Debugging log

      //document.getElementById("current-score").textContent = score;
      document.getElementById("quiz-content").classList.add("hidden");
      document.getElementById("results").classList.remove("hidden");
   
      document.getElementById(
        "final-score"
      ).textContent = `${score}/${total}`;

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
      //showAnswerReview();

    })
    .catch(error => { 
      console.error('Error submitting quiz:', error);
      alert('There was an error submitting your quiz. Please try again later.');
    }
  );


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
  // Load data from external JSON file (all quizzes being loaded for now)
      loadQuizFromJSON('/api/quiz').then(data => {
          if (data) {
              quizData = data;
              //console.log("Quiz data loaded:", quizData);  // Testing
              initializeQuiz(quizData); // Call initializeQuiz after loading data - give time to load
          } else {
              document.getElementById('loading').textContent = 'Error loading quiz data';
          }
      });
};