const path = require('path');
const express = require('express');
const app = express();

// Serve static files
app.use(express.static(__dirname + '/dist/fitTreat-adminapp1'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/fitTreat-adminapp/index.html'));
});

// default Heroku port

let env = process.env.NODE_ENV || 'development';

app.listen(process.env.PORT || 5000);

let forceSSL = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

if (env === 'production') {
  app.use(forceSSL);
}