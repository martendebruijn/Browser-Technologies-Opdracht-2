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
app
  .get('/', (req, res) => res.render('home'))
  .get('/generate-user-code', (req, res) =>
    res.render('generate-user-code', { userid: generate.userid() })
  )
  .get('/use-user-code', (req, res) => res.render('use-user-code'))

  .post('/use-user-code', urlencodedParser, (req, res) =>
    user.check(req.body, res)
  )
  .post('/vraag1', urlencodedParser, (req, res) => storage.setup(req.body, res))
  .post('/vraag2', urlencodedParser, (req, res) =>
    storage.addDataToArray(req.body, 'vraag1', 'vraag2', res)
  )
  .post('/vraag3', urlencodedParser, (req, res) =>
    storage.addDataToArray(req.body, 'vraag2', 'vraag3', res)
  )
  .post('/vraag4', urlencodedParser, (req, res) =>
    storage.addDataToArray(req.body, 'vraag3', 'vraag4', res)
  )
  .post('/vraag5', urlencodedParser, (req, res) =>
    storage.addDataToArray(req.body, 'vraag4', 'vraag5', res)
  )
  .post('/vraag6', urlencodedParser, (req, res) =>
    storage.addDataToArray(req.body, 'vraag5', 'vraag6', res)
  )
  .post('/vraag7', urlencodedParser, (req, res) =>
    storage.addDataToArray(req.body, 'vraag6', 'vraag7', res)
  )
  .post('/finished', urlencodedParser, (req, res) =>
    storage.addDataToArray(req.body, 'vraag7', 'finished', res)
  )

  .listen(port, () => console.log(`Example app listening on port ${port}`));
