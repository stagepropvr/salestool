var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./localhost.key', 'utf8');
var certificate = fs.readFileSync('./localhost.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
const app = express();
var path=require('path');
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));


app.get('/salestool/service-worker.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'service-worker.js'));
});

app.get('/salestool/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);
