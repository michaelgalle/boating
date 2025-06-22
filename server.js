
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
