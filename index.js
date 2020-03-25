// Require third-party modules
const express = require('express');
const fs = require('fs'); // node.js file server module
const dotenv = require('dotenv'); // require dotenv: module that loads env var from .env into process.env
dotenv.config();

// Create new express app in 'app'
const app = express();
const port = process.env.PORT || 3000;

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

// ROUTE FUNCTIONS
function checkIfThereAreAnswers(req, res, i) {
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    if (err) throw err;
    if (data) {
      goToQuestion(req, res, i); // render the question
    } else {
      res.render(`vraag1`, {
        // render question 1 if there aren't any answers given
        title: `Vraag 1`,
        answer: '',
      });
    }
  });
}

// check last question
function checkIfAlreadyAnswered(req, res, i) {
  console.log('this has to be written:');
  console.log();
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    //use utf8 to read txt file
    if (err) throw err;
    if (!data) {
      const name = req.body.name;
      const name = parsedData.vraag1;
      const age = req.body.leeftijd;
      const opleiding = req.body.opleiding;
      const kleur = req.body.kleur;
      const verjaardag = req.body.verjaardag;
      const cijfer = req.body.cijfer;
      const docent = req.body.docent;
      const writeArray = [
        `"vraag1": "${name}"`,
        `"vraag2": "${age}"`,
        `"vraag3": "${opleiding}"`,
        `"vraag4": "${kleur}"`, //maak dit 'schoner' en just copy it over alle post request en iedere keer met nieuwe propertys
        `"vraag5": "${verjaardag}"`,
        `"vraag6": "${cijfer}"`,
        `"vraag7": "${docent}"`,
      ];
      console.log(writeArray);
      const isItUndefined = writeArray.map(item => item.includes('undefined'));
      function isFalse(val) {
        return val === false;
      }
      const writtenIndex = isItUndefined.filter(isFalse);
      console.log(writtenIndex.length);
      const writeUntil = writtenIndex.length; /// outcome = 1
      const elementsToWrite = writeArray.slice(0, writeUntil); // dit doet die nu alleen maar wanneer er geen data is, zet dit bij console.log(i  = i) en zorg ervoor dat hij of req.body pakt of parsedData.name bv
      console.log(elementsToWrite);
      fs.writeFile('./answers/answers.txt', `{${elementsToWrite}}`, function(
        err
      ) {
        if (err) throw err;
        console.log('The file was saved!');
      });
      res.render('vraag2', {
        title: 'Vraag 2',
        answer: '',
      });
    } else {
      const parsedData = JSON.parse(data);
      const keys = Object.keys(parsedData); // get the keys
      const values = Object.values(parsedData); // get the values
      const keysLength = keys.length; // get the length
      if (keysLength >= i) {
        console.log(`keysLength >= ${i}`);
        if (!values[i + 1] === undefined) {
          console.log('hois');
          console.log(values[i + 1]);
          res.render(`vraag${i + 1}`, {
            title: `Vraag ${i + 1}`,
            answer: '',
          });
        } else {
          res.render(`vraag${i + 1}`, {
            title: `Vraag ${i + 1}`,
            answer: values[i],
          });
        }
      }
      const name = req.body.name;
      console.log(`i = ${i}`); // outcome = 1

      fs.writeFile(
        './answers/answers.txt',
        `{ "vraag1": "${name}", }`,
        function(err) {
          if (err) throw err;
          console.log('The file was saved!');
        }
      );
    }
  });
}

// FUNCTION TO ROUTE TO THE QUESTION
function goToQuestion(req, res, i) {
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    //use utf8 to read txt file
    if (err) throw err;
    const parsedData = JSON.parse(data); // make an object // if answers.txt is empty it wont parse and vraag1 has to render
    const keys = Object.keys(parsedData); // get the keys
    const values = Object.values(parsedData); // get the values
    const keysLength = keys.length; // get the length
    const question = keys[i - 1]; // get the question minus 1 because the array counts from 0
    const answer = values[i - 1]; // get the answer minus 1 because the array counts from 0
    const lastKey = keys[keysLength - 1]; // get the last key
    console.log('last question:');
    console.log(lastKey);
    const lastAnswer = parsedData[lastKey]; // get the last answer
    if (keysLength >= i) {
      // check if the question is answered
      res.render(question, {
        // render the question with the given answer
        title: question,
        answer: answer,
      });
    } else {
      // if the question trying to load isn't answered go to the last question answered
      res.render(`vraag${keysLength}`, {
        title: `Vraag ${keysLength}`,
        answer: lastAnswer, // the last answer given
      });
    }
  });
}

// GET REQUESTS
app.get('/', function(req, res) {
  const data = '';
  fs.writeFile('./answers/answers.txt', data, err => {
    if (err) throw err;
    console.log('Data written to file'); // is niet perse waar
  });
  checkIfThereAreAnswers(req, res, 1);
});
app.get('/vraag1', function(req, res) {
  checkIfThereAreAnswers(req, res, 1);
});
app.get('/vraag2', function(req, res) {
  checkIfThereAreAnswers(req, res, 2);
});
app.get('/vraag3', function(req, res) {
  checkIfThereAreAnswers(req, res, 3);
});
app.get('/vraag4', function(req, res) {
  checkIfThereAreAnswers(req, res, 4);
});
app.get('/vraag5', function(req, res) {
  checkIfThereAreAnswers(req, res, 5);
});
app.get('/vraag6', function(req, res) {
  checkIfThereAreAnswers(req, res, 6);
});
app.get('/vraag7', function(req, res) {
  checkIfThereAreAnswers(req, res, 7);
});
app.get('finished', function(req, res) {
  checkIfThereAreAnswers(req, res, 8);
});

// Go to last answered question or the first question if there aren't any answers
app.get('/continue', function(req, res) {
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    //use utf8 to read txt file
    if (err) throw err;
    if (data) {
      const parsedData = JSON.parse(data);
      const keys = Object.keys(parsedData);
      const keysLength = keys.length;
      const lastKey = keys[keysLength - 1];
      const lastAnswer = parsedData[lastKey];
      res.render(`vraag${keysLength}`, {
        title: `Vraag ${keysLength}`, //dit werkt niet voor de laatste vraag
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

// POST REQUESTS
app.post('/vraag2', function(req, res) {
  checkIfAlreadyAnswered(req, res, 1);
  // console.log(req.body);
  // const name = req.body.name;
  // fs.writeFile('./answers/answers.txt', `{"vraag1": "${name}"}`, function(err) {
  //   if (err) throw err;
  //   console.log('The file was saved!');
  // });
  // res.render('vraag2', {
  //   title: 'Vraag 2',
  //   answer: '',
  // });
  // res.end();
});
app.post('/vraag3', function(req, res) {
  checkIfAlreadyAnswered(req, res, 2);
  // const age = req.body.leeftijd;
  // fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
  //   //use utf8 to read txt file
  //   if (err) throw err;
  //   const parsedData = JSON.parse(data);
  //   const name = parsedData.vraag1;
  //   fs.writeFile(
  //     './answers/answers.txt',
  //     `{"vraag1": "${name}", "vraag2":"${age}"}`,
  //     function(err) {
  //       if (err) throw err;
  //       console.log('The file was updated!');
  //     }
  //   );
  // });
  // res.render('vraag3', {
  //   title: 'Vraag 3',
  //   answer: '',
  // });
  // res.end();
});
app.post('/vraag4', function(req, res) {
  const age = req.body.leeftijd;
  const opleiding = req.body.opleiding;
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    //use utf8 to read txt file
    if (err) throw err;
    const parsedData = JSON.parse(data);
    const name = parsedData.vraag1;
    const age = parsedData.vraag2;
    fs.writeFile(
      './answers/answers.txt',
      `{"vraag1": "${name}", "vraag2":"${age}", "vraag3":"${opleiding}"}`,
      function(err) {
        if (err) throw err;
        console.log('The file was updated!');
      }
    );
  });
  res.render('vraag4', {
    title: 'Vraag 4',
    answer: '',
  });
  res.end();
});
app.post('/vraag5', function(req, res) {
  const age = req.body.leeftijd;
  const opleiding = req.body.opleiding;
  const kleur = req.body.kleur;
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    //use utf8 to read txt file
    if (err) throw err;
    const parsedData = JSON.parse(data);
    console.log('parsed:');
    console.log(parsedData);
    const name = parsedData.vraag1;
    const age = parsedData.vraag2;
    const opleiding = parsedData.vraag3;
    fs.writeFile(
      './answers/answers.txt',
      `{"vraag1": "${name}", "vraag2":"${age}", "vraag3":"${opleiding}", "vraag4":"${kleur}"}`,
      function(err) {
        if (err) throw err;
        console.log('The file was updated!');
      }
    );
  });
  res.render('vraag5', {
    title: 'Vraag 5',
    answer: '',
  });
  res.end();
});
app.post('/vraag6', function(req, res) {
  const age = req.body.leeftijd;
  const opleiding = req.body.opleiding;
  const kleur = req.body.kleur;
  const verjaardag = req.body.verjaardag;
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    //use utf8 to read txt file
    if (err) throw err;
    const parsedData = JSON.parse(data);
    const name = parsedData.vraag1;
    const age = parsedData.vraag2;
    const opleiding = parsedData.vraag3;
    const kleur = parsedData.vraag4;
    fs.writeFile(
      './answers/answers.txt',
      `{"vraag1": "${name}", "vraag2":"${age}", "vraag3":"${opleiding}", "vraag4":"${kleur}", "vraag5":"${verjaardag}"}`,
      function(err) {
        if (err) throw err;
        console.log('The file was updated!');
      }
    );
  });
  res.render('vraag6', {
    title: 'Vraag 6',
    answer: '',
  });
  res.end();
});
app.post('/vraag7', function(req, res) {
  const age = req.body.leeftijd;
  const opleiding = req.body.opleiding;
  const kleur = req.body.kleur;
  const verjaardag = req.body.verjaardag;
  const cijfer = req.body.cijfer;
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    //use utf8 to read txt file
    if (err) throw err;
    const parsedData = JSON.parse(data);
    const name = parsedData.vraag1;
    const age = parsedData.vraag2;
    const opleiding = parsedData.vraag3;
    const kleur = parsedData.vraag4;
    const verjaardag = parsedData.vraag5;
    fs.writeFile(
      './answers/answers.txt',
      `{"vraag1": "${name}", "vraag2":"${age}", "vraag3":"${opleiding}", "vraag4":"${kleur}", "vraag5":"${verjaardag}", "vraag6":"${cijfer}"}`,
      function(err) {
        if (err) throw err;
        console.log('The file was updated!');
      }
    );
  });
  res.render('vraag7', {
    title: 'Vraag 7',
    answer: '',
  });
  res.end();
});
app.post('/finished', function(req, res) {
  const age = req.body.leeftijd;
  const opleiding = req.body.opleiding;
  const kleur = req.body.kleur;
  const verjaardag = req.body.verjaardag;
  const cijfer = req.body.cijfer;
  const docent = req.body.docent;
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    //use utf8 to read txt file
    if (err) throw err;
    const parsedData = JSON.parse(data);
    const name = parsedData.vraag1;
    const age = parsedData.vraag2;
    const opleiding = parsedData.vraag3;
    const kleur = parsedData.vraag4;
    const verjaardag = parsedData.vraag5;
    const cijfer = parsedData.vraag6;
    fs.writeFile(
      './answers/answers.txt',
      `{"vraag1": "${name}", "vraag2":"${age}", "vraag3":"${opleiding}", "vraag4":"${kleur}", "vraag5":"${verjaardag}", "vraag6":"${cijfer}", "vraag7": "${docent}"}`,
      function(err) {
        if (err) throw err;
        console.log('The file was updated!');
      }
    );
  });
  res.render('finished', {
    title: 'Finished',
    answer: '',
  });
  res.end();
});

// app.post('/save', function(req, res) {
//   fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
//     //use utf8 to read txt file
//     if (err) throw err;

//   });
//   res.render('finished', {
//     title: 'Finished',
//     answer: '',
//   });
//   res.end();
// });
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
