const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const app = express();

// Static assets folder
app.use(express.static('public'));

// Declare template engine and path
app.set('view engine', 'ejs');
app.set('views', 'views');

// Routes
app.get('/', (req, res) => {
  res.render('homev2', {
    style: './css/styles-v2.0.css',
    script: './js/home.js',
  });
});
app.get('/v2', (req, res) => {
  res.redirect('/');
});
app.get('/v2/enquete', (req, res) => {
  res.render('enquetev2', {
    style: '../css/styles-v2.0.css',
    script: '../js/main-v2.0.js',
    query: req.query,
  });
});
app.get('/v2/enquete/finished', (req, res) => {
  res.render('finishedv2', {
    style: '../../css/styles-v2.0.css',
    script: '../../js/main-v2.0.js',
  });
});
app.get('/save', (req, res) => {
  let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  let destination = fullUrl.replace('save', 'v2/enquete');
  res.render('save', {
    style: '../css/styles-v2.0.css',
    script: '../js/main-v2.0.js',
    destination,
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
