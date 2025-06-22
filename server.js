/*
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000; // Must run with sudo if using port 80 on Linux

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Optional: fallback route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
*/


const express = require('express');
const app = express();

// Serve static files from /public
app.use(express.static('public'));


app.get('/', (req, res) => {
  //res.send('Hello world');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(80, () => {
  console.log('Listening on port 80');
}).on('error', (err) => {
  console.error('Server failed to start - might need root privileges:', err.message);
});
