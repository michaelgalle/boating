
const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the public folder and return index.html for the root URL
// This allows the index.html to be accessed via http://baseURL.com/
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve static files from the /private folder - this allows access to files in the private directory if an absolute path (../private/<subfolder>/) is provided
app.use('/private', express.static('private'));  
// Return final_exam.html for the /exam URL
app.get('/exam', (req, res) => {
  res.sendFile(path.join(__dirname, 'private', 'exam.html'));  // Serve final_exam.html for /exam URL and 
});

app.listen(80, () => {
  console.log('Listening on port 80');
}).on('error', (err) => {
  console.error('Server failed to start - might need root privileges:', err.message);
});
