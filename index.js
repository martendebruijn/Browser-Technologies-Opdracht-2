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

// GET REQUESTS
app.get('/', function(req, res) {
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    //use utf8 to read txt file
    if (err) throw err;
    if (data) {
      const parsedData = JSON.parse(data);
      const keys = Object.keys(parsedData);
      const keysLength = keys.length;
      const lastKey = keys[keysLength - 1];
      res.render(lastKey, {
        title: lastKey,
        answer: '',
      });
    } else {
      res.render('vraag1', {
        title: 'Vraag 1',
        answer: '',
      });
    }
  });
});
app.get('/vraag2', function(req, res) {
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    //use utf8 to read txt file
    if (err) throw err;
    if (data) {
      const parsedData = JSON.parse(data);
      const keys = Object.keys(parsedData);
      const keysLength = keys.length;
      const lastKey = keys[keysLength - 1];
      res.render(lastKey, {
        title: lastKey,
        answer: '',
      });
    } else {
      res.render('vraag1', {
        title: 'Vraag 1',
        answer: '',
      });
    }
  });
});
app.get('/vraag3', function(req, res) {
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    //use utf8 to read txt file
    if (err) throw err;
    if (data) {
      const parsedData = JSON.parse(data);
      const keys = Object.keys(parsedData);
      const keysLength = keys.length;
      const lastKey = keys[keysLength - 1];
      res.render(lastKey, {
        title: lastKey,
        answer: '',
      });
    } else {
      res.render('vraag1', {
        title: 'Vraag 1',
        answer: '',
      });
    }
  });
});
app.get('/vraag4', function(req, res) {
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    //use utf8 to read txt file
    if (err) throw err;
    if (data) {
      const parsedData = JSON.parse(data);
      const keys = Object.keys(parsedData);
      const keysLength = keys.length;
      const lastKey = keys[keysLength - 1];
      res.render(lastKey, {
        title: lastKey,
        answer: '',
      });
    } else {
      res.render('vraag1', {
        title: 'Vraag 1',
        answer: '',
      });
    }
  });
});
app.get('/vraag5', function(req, res) {
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    //use utf8 to read txt file
    if (err) throw err;
    if (data) {
      const parsedData = JSON.parse(data);
      const keys = Object.keys(parsedData);
      const keysLength = keys.length;
      const lastKey = keys[keysLength - 1];
      res.render(lastKey, {
        title: lastKey,
        answer: '',
      });
    } else {
      res.render('vraag1', {
        title: 'Vraag 1',
        answer: '',
      });
    }
  });
});
app.get('/vraag6', function(req, res) {
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    //use utf8 to read txt file
    if (err) throw err;
    if (data) {
      const parsedData = JSON.parse(data);
      const keys = Object.keys(parsedData);
      const keysLength = keys.length;
      const lastKey = keys[keysLength - 1];
      res.render(lastKey, {
        title: lastKey,
        answer: '',
      });
    } else {
      res.render('vraag1', {
        title: 'Vraag 1',
        answer: '',
      });
    }
  });
});
app.get('/vraag7', function(req, res) {
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    //use utf8 to read txt file
    if (err) throw err;
    if (data) {
      const parsedData = JSON.parse(data);
      const keys = Object.keys(parsedData);
      const keysLength = keys.length;
      const lastKey = keys[keysLength - 1];
      res.render(lastKey, {
        title: lastKey,
        answer: '',
      });
    } else {
      res.render('vraag1', {
        title: 'Vraag 1',
        answer: '',
      });
    }
  });
});
app.get('/finished', function(req, res) {
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    //use utf8 to read txt file
    if (err) throw err;
    if (data) {
      const parsedData = JSON.parse(data);
      const keys = Object.keys(parsedData);
      const keysLength = keys.length;
      const lastKey = keys[keysLength - 1];
      res.render(lastKey, {
        title: lastKey,
        answer: '',
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
  console.log(req.body);
  // res.redirect(req.path + '?q=' + req.body.name); // zet de naam in de url
  const name = req.body.name;
  fs.writeFile('./answers/answers.txt', `{"vraag1": "${name}"}`, function(err) {
    if (err) throw err;
    console.log('The file was saved!');
  });
  res.render('vraag2', {
    title: 'Vraag 2',
    answer: '',
  });
  res.end();
});
app.post('/vraag3', function(req, res) {
  const age = req.body.leeftijd;
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    //use utf8 to read txt file
    if (err) throw err;
    const dataObj = data;
    const parsedData = JSON.parse(dataObj);
    const name = parsedData.vraag1;
    fs.writeFile(
      './answers/answers.txt',
      `{"vraag1": "${name}", "vraag2":"${age}"}`,
      function(err) {
        if (err) throw err;
        console.log('The file was updated!');
      }
    );
  });
  res.render('vraag3', {
    title: 'Vraag 3',
    answer: '',
  });
  res.end();
});
app.post('/vraag4', function(req, res) {
  const opleiding = req.body.opleiding;
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    //use utf8 to read txt file
    if (err) throw err;
    const dataObj = data;
    const parsedData = JSON.parse(dataObj);
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
  const kleur = req.body.kleur;
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    //use utf8 to read txt file
    if (err) throw err;
    const dataObj = data;
    const parsedData = JSON.parse(dataObj);
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
  const verjaardag = req.body.verjaardag;
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    //use utf8 to read txt file
    if (err) throw err;
    const dataObj = data;
    const parsedData = JSON.parse(dataObj);
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
  const cijfer = req.body.cijfer;
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    //use utf8 to read txt file
    if (err) throw err;
    const dataObj = data;
    const parsedData = JSON.parse(dataObj);
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
  const docent = req.body.docent;
  fs.readFile('./answers/answers.txt', 'utf8', function(err, data) {
    //use utf8 to read txt file
    if (err) throw err;
    const dataObj = data;
    const parsedData = JSON.parse(dataObj);
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
