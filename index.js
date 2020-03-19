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
// app.get('/', (req, res) => {
//   res.render('vraag1', {
//     title: 'Enquete Minor WebDevelopment',
//     answer: '',
//   });
// });

let dataArr = {};

app.get('/', function(req, res) {
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    // use utf8 to read txt file
    if (err) throw err;
    console.log(data);
    // const parsedData = JSON.parse(`{${data}}`); // Creates an object
    // const objKeys = Object.keys(parsedData);
    // const objLength = objKeys.length; // Returnes the length of the object (returnes 0 if answers.txt is empty)
    // const lastKey = objKeys[objLength - 1];
    // const lastAnswer = parsedData[lastKey];
    // console.log(lastAnswer);
    const lastAnswer = '';
    if (lastAnswer) {
      res.render('vraag1', {
        title: 'Vraag 1',
        answer: lastAnswer,
      });
    } else {
      res.render('vraag1', {
        title: 'Vraag 1',
        answer: '',
      });
    }
  });
});

app.post('/vraag2', function(req, res) {
  console.log(req.body);
  // res.redirect(req.path + '?q=' + req.body.name); // zet de naam in de url
  dataArr.naam = req.body.name;

  console.log(dataArr);
  fs.writeFile('./answers/answers.txt', `naam: ${dataArr.naam}`, function(err) {
    if (err) throw err;
    console.log('The file was saved!');
  });
  res.render('vraag2', {
    title: 'Vraag 2',
    answer: '',
  });
  res.end();
});
// TO DO rewrite every route als onderstaande
// maak een functie die checkt of answers.txt leeg is of niet
// wanneer een gebruiker de enquete laad moet de app checken of answers leeg is of niet, wanneer deze leeg is moet hij naar q1 anders naar de laatst beantwoorde q
// ook moet men op een terug knop moeten kunnen drukken
// en dan moet de waarde ingevuld zijn
app.post('/vraag3', function(req, res) {
  console.log(req.body);
  dataArr.leeftijd = req.body.leeftijd;
  console.log(dataArr);
  fs.writeFile(
    './answers/answers.txt',
    `naam: ${dataArr.naam}, leeftijd: ${dataArr.leeftijd}`,
    function(err) {
      if (err) throw err;
      console.log('The file was updated!');
      console.log(dataArr);
    }
  );
  res.render('vraag3', {
    title: 'Vraag 3',
    answer: '',
  });
  res.end();
});

app.post('/vraag4', function(req, res) {
  console.log(req.body);
  fs.appendFile(
    './answers/answers.txt',
    `,"vraag3":"${req.body.opleiding}" `,
    function(err) {
      if (err) throw err;
      console.log('The file was updated!');
    }
  );
  res.render('vraag4', {
    title: 'Vraag 4',
    answer: '',
  });
  res.end();
});

app.post('/vraag5', function(req, res) {
  console.log(req.body);
  fs.appendFile(
    './answers/answers.txt',
    `,"vraag4":"${req.body.kleur}" `,
    function(err) {
      if (err) throw err;
      console.log('The file was updated!');
    }
  );
  res.render('vraag5', {
    title: 'Vraag 5',
    answer: '',
  });
  res.end();
});

app.post('/vraag6', function(req, res) {
  console.log(req.body);
  fs.appendFile(
    './answers/answers.txt',
    `,"vraag5":"${req.body.verjaardag}" `,
    function(err) {
      if (err) throw err;
      console.log('The file was updated!');
    }
  );
  res.render('vraag6', {
    title: 'Vraag 6',
    answer: '',
  });
  res.end();
});

app.post('/vraag7', function(req, res) {
  console.log(req.body);
  fs.appendFile(
    './answers/answers.txt',
    `,"vraag6":"${req.body.cijfer}" `,
    function(err) {
      if (err) throw err;
      console.log('The file was updated!');
    }
  );
  res.render('vraag7', {
    title: 'Vraag 7',
    answer: '',
  });
  res.end();
});

app.post('/finished', function(req, res) {
  console.log(req.body);
  fs.appendFile(
    './answers/answers.txt',
    `,"vraag7":"${req.body.docent}"`,
    function(err) {
      if (err) throw err;
      console.log('The file was updated!');
    }
  );
  res.render('finished', {
    title: 'Finished',
  });
  res.end();
});

app.get('/test', function(req, res) {
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    // use utf8 to read txt file
    if (err) throw err;
    // console.log(data);

    const parsedData = JSON.parse(`{${data}}`); // Creates an object
    // console.log(Object.keys(parsedData).length);
    const objKeys = Object.keys(parsedData);
    const objLength = objKeys.length; // Returnes the length of the object (returnes 0 if answers.txt is empty)
    if (objLength > 0) {
      console.log(parsedData);
      const lastKey = objKeys[objLength - 1]; // -1 because the index counts from 0 but the length = 1 (if there is 1 item)
      console.log(lastKey);
      const redirectURL = `/continue/${lastKey}`; // redirect to the last page the user was
      console.log(redirectURL);
      const lastAnswer = parsedData[lastKey]; // get the answer
      res.render(lastKey, {
        title: 'Read',
        answer: lastAnswer,
      });
    }
  });
});

app.get('/test2', goToLastAnsweredPage);

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

function goToLastAnsweredPage(req, res) {
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    if (data) {
      // check if answers.txt is not empty
      console.log('Wel data');
      //hier wil ik de vraag renderen waar de gebruiker gebleven was
      fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
        // Render the last answered question
        // use utf8 to read txt file
        if (err) throw err;
        console.log(data);
        const parsedData = JSON.parse(`{${data}}`); // Creates an object
        const objKeys = Object.keys(parsedData);
        const objLength = objKeys.length; // Returnes the length of the object (returnes 0 if answers.txt is empty)
        const lastKey = objKeys[objLength - 1];
        const lastAnswer = parsedData[lastKey];
        console.log(lastAnswer);
        res.render(lastKey, {
          title: '_test',
          answer: lastAnswer,
        });
      });
    } else {
      console.log('Geen data');
      // hier wil ik dan vraag 1 renderen
      res.render('vraag1', {
        //render question 1
        title: 'Vraag 1',
        answer: '',
      });
    }
  });
}

app.listen(port, function() {
  console.log(`Application started on port: ${port}`);
});
