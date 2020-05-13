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

// Imported functions
const storage = require('./modules/storage.js');
const generate = require('./modules/generate.js');
const user = require('./modules/user.js');

// Routes
app.get('/v2', (req, res) => {
  res.render('homev2', {
    style: './css/styles-v2.0.css',
    script: './js/main-v2.0.js',
    answer: ' ',
  });
});
app.get('/', (req, res) => {
  res.render('home', {
    style: './css/styles.css',
    script: './js/main.js',
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
