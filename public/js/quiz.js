//alert("Quiz JavaScript loaded successfully!");
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