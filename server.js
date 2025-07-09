const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Serve static files from the public folder
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
  const quizPath = path.join(__dirname, 'quiz', 'quiz-data.json');
  fs.readFile(quizPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Quiz data load error:', err);
      return res.status(500).send('Quiz data not available');
    }
    res.json(JSON.parse(data));
  });
});

// Start the server
app.listen(80, () => {
  console.log('Listening on port 80');
}).on('error', (err) => {
  console.error('Server failed to start - might need root privileges:', err.message);
});