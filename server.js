'use strict';

const express = require('express');
const path = require('path');

// app configuration
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (res, req) => {
  res.sendFile('index.html');
});

// listen to app
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('server started on port', port);
});