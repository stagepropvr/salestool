//server.js
const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 5001;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'salestool')));


app.get('/salestool/service-worker.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'service-worker.js'));
});

app.get('/salestool/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
});