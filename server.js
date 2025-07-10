const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Serve static files from the /public and /private folder (fix this later so everything comes from public?)
app.use(express.static('public'));
app.use('/private', express.static('private'));

// Serve index.html at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve final_exam.html at /exam 
app.get('/exam', (req, res) => {
  res.sendFile(path.join(__dirname, 'private', 'exam.html'));
});

// API endpoint to securely serve quiz data (not publicly accessible as a file)
app.get('/api/quiz', (req, res) => {
  const quizPath = path.join(__dirname, 'quiz', 'questions.json');
  fs.readFile(quizPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Quiz data load error:', err);
      return res.status(500).send('Quiz data not available');
    }
    res.json(JSON.parse(data));
  });
});

// Handle Quiz Submission via post request
app.use(express.json());  // Middleware required to parse JSON body from post requests
app.post('/api/submit-quiz', (req, res) => {
  const userAnswers = req.body.answers; 
  const quizNumber = req.body.quizNumber; 
  let score = 0;
  let percentage = 0;
  let correctAnswerObjects = [];
  let correctAnswers = [];

  try {
    const quizAnswerData = JSON.parse(fs.readFileSync(
      path.join(__dirname, 'quiz', 'answers.json'),
      'utf8'
    ));

    //console.log("Quiz number:", quizNumber); // Debugging log
    //console.log("User answers:", userAnswers); // Debugging log 
    //console.log("Question answers:", quizAnswerData["quiz"][quizNumber].questions); // Debugging log

    // Extract correct answers from the quiz answer data
    // quizAnswerData["quiz"][quizNumber].questions is an array of objects with correct answers form { correctAnswer: value } 
    correctAnswerObjects = quizAnswerData["quiz"][quizNumber].questions;    
    correctAnswerObjects.forEach((answer, i) => {
      correctAnswers[i] = answer.correctAnswer; // Collect correct answers      
      if (userAnswers[i] === correctAnswers[i]) {
        score++;
      }
    }
    );

    //console.log("Correct answers:", correctAnswers); // Debugging log
    //console.log("User score:", score); // Debugging log
    

    percentage = Math.round((score / correctAnswers.length) * 100);

    // Send response back to the client
    res.json({
      score: score,
      total: correctAnswers.length,
      percentage: percentage
    });

  } catch (err) {
    console.error("Error processing quiz submission:", err);
    res.status(500).send("Server error during scoring.");
  }
});

// Start the server
app.listen(80, () => {
  console.log('Listening on port 80');
}).on('error', (err) => {
  console.error('Server failed to start - might need root privileges:', err.message);
});