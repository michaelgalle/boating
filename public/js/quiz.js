//alert("Quiz JavaScript loaded successfully!");
function attachQuizListeners() {
  document.querySelectorAll('.quiz-question').forEach(function(question) {
    question.querySelectorAll('input[type="radio"]').forEach(function(radio) {
      radio.addEventListener('change', function() {
        const feedback = question.querySelector('.quiz-feedback');
        if (radio.hasAttribute('data-answer')) {
          feedback.textContent = "Correct!";
          feedback.style.color = "green";
        } else {
          feedback.textContent = "Incorrect. Try again!";
          feedback.style.color = "red";
        }
      });
    });
  });
}

// Initial call to attach listeners
attachQuizListeners();
setTimeout(attachQuizListeners, 1000); // Retry after 1 second in case the DOM is not fully loaded
setTimeout(attachQuizListeners, 2000); // Retry after 2 seconds
