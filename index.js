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
app.get('/', (req, res) => {
  res.render('home', {
    style: './css/styles.css',
    script: './js/main.js',
  });
});
app.get('/generate-user-code', (req, res) => {
  res.render('generate-user-code', {
    userid: generate.userid(),
    style: './css/styles.css',
    script: './js/main.js',
  });
});
app.get('/use-user-code', (req, res) => {
  res.render('use-user-code', {
    style: './css/styles.css',
    script: './js/main.js',
  });
});

app.post('/use-user-code', urlencodedParser, (req, res) => {
  user.check(req.body, res);
});
app.post('/vraag1/:id', urlencodedParser, (req, res) => {
  console.log('req: ');
  console.log(req.body);
  storage.setup(req.body, res);
});
app.post('/vraag2/:id', urlencodedParser, (req, res) => {
  console.log('req: ');
  console.log(req.body);
  console.log(req.params.id);
  const id = req.params.id;
  storage.checkAnswer(id, 'vraag2', 'vraag2', res);
  storage.addDataToArray(req.body, id, 'vraag1');
});
app.post('/vraag3/:id', urlencodedParser, (req, res) => {
  const id = req.params.id;
  storage.checkAnswer(id, 'vraag3', 'vraag3', res);
  storage.addDataToArray(req.body, id, 'vraag2');
});
app.post('/vraag4/:id', urlencodedParser, (req, res) => {
  const id = req.params.id;
  storage.checkAnswer(id, 'vraag4', 'vraag4', res);
  storage.addDataToArray(req.body, id, 'vraag3');
});
app.post('/vraag5/:id', urlencodedParser, (req, res) => {
  const id = req.params.id;
  storage.checkAnswer(id, 'vraag5', 'vraag5', res);
  storage.addDataToArray(req.body, id, 'vraag4');
});
app.post('/vraag6/:id', urlencodedParser, (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  storage.checkAnswer(id, 'vraag6', 'vraag6', res);
  storage.addDataToArray(req.body, id, 'vraag5');
});
app.post('/vraag7/:id', urlencodedParser, (req, res) => {
  const id = req.params.id;
  storage.checkAnswer(id, 'vraag7', 'vraag7', res);
  storage.addDataToArray(req.body, id, 'vraag6');
});
app.post('/finished/:id', urlencodedParser, (req, res) => {
  const id = req.params.id;
  storage.addDataToArray(req.body, id, 'vraag7');
  res.render('finished', {
    userid: id,
    style: './../css/styles.css',
    script: './../js/main.js',
  });
});
app.get('/swipe-test', (req, res) => {
  res.send('HOERA JE HEBT GESWIPTED');
});
app.get('/vraag1/:id', urlencodedParser, (req, res) => {
  const id = req.params.id;
  storage.checkAnswer(id, 'vraag1', 'vraag1', res);
});
app.get('/vraag2/:id', urlencodedParser, (req, res) => {
  const id = req.params.id;
  storage.checkAnswer(id, 'vraag2', 'vraag2', res);
});
app.get('/vraag3/:id', urlencodedParser, (req, res) => {
  const id = req.params.id;
  storage.checkAnswer(id, 'vraag3', 'vraag3', res);
});
app.get('/vraag4/:id', urlencodedParser, (req, res) => {
  const id = req.params.id;
  storage.checkAnswer(id, 'vraag4', 'vraag4', res);
});
app.get('/vraag5/:id', urlencodedParser, (req, res) => {
  const id = req.params.id;
  storage.checkAnswer(id, 'vraag5', 'vraag5', res);
});
app.get('/vraag6/:id', urlencodedParser, (req, res) => {
  const id = req.params.id;
  storage.checkAnswer(id, 'vraag6', 'vraag6', res);
});
app.get('/vraag7/:id', urlencodedParser, (req, res) => {
  const id = req.params.id;
  storage.checkAnswer(id, 'vraag7', 'vraag7', res);
});
app.get('/finished/:id', urlencodedParser, (req, res) => {
  const id = req.params.id;
  storage.checkAnswer(id, 'finished', 'finished', res);
});
app.listen(port, () => console.log(`Example app listening on port ${port}`));
