// Require third-party modules
const express = require('express');

// Create new express app in 'app'
const app = express();
const port = 3000;

// Tell express to use a 'static' folder (the public folder)
// If the url matches a file it will send that file
// Sending something (responding) ends the response cycle
app.use(express.static('public'));

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

// Set up the server
app.listen(port, function() {
  console.log(`Application started on port: ${port}`);
});
