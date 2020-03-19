// Require third-party modules
const express = require('express');
const fs = require('fs'); // node.js file server module

// Create new express app in 'app'
const app = express();
const port = 3000;

// Tell express to use a 'static' folder (the public folder)
// If the url matches a file it will send that file
// Sending something (responding) ends the response cycle
app.use(express.static('public'));

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Use view enging ejs
app.set('view engine', 'ejs');
// Tell ejs where the template files are stored (settingname, value)
app.set('views', 'views');

// Set home route
app.get('/', (req, res) => {
  res.render('home', {
    title: 'Enquete Minor WebDevelopment',
  });
});

app.post('/vraag2', function(req, res) {
  console.log(req.body);
  fs.writeFile('./answers/answers.txt', 'name = ' + req.body.name, function(
    err
  ) {
    if (err) throw err;
    console.log('The file was saved!');
  });
  res.render('vraag2', {
    title: 'Vraag 2',
    name: req.body.name,
  });
  res.end();
});

app.post('/vraag3', async function(req, res) {
  console.log(req.body);

  fs.appendFile(
    './answers/answers.txt',
    ' leeftijd = ' + req.body.leeftijd,
    function(err) {
      if (err) throw err;
      console.log('The file was updated!');
    }
  );
  res.render('vraag3', {
    title: 'Vraag 3',
  });
  res.end();
});

// //READ
//  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
//    //use utf8 to read txt file
//    if (err) throw err;
//    console.log(data);
//  });

//  //WRITE
// fs.writeFile('./answers/answers.txt', data, err => {
//   if (err) throw err;
//   console.log('Data written to file');
// });

// //UPDATE
// fs.appendFile('./answers/answers.txt', data2, function(err) {
//   if (err) throw err;
//   console.log('Updated!');
// });
// Set up the server
app.listen(port, function() {
  console.log(`Application started on port: ${port}`);
});
