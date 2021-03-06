require('dotenv').config();

const express = require('express');
const path = require('path');

// app configuration
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// listen to app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('client started on port', port);
});
