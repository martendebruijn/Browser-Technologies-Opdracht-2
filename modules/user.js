const storage = require('../modules/storage.js');

module.exports = {
  check,
};

function check(input, res) {
  getUser(input)
    ? renderNewRoute(input, res)
    : res.redirect('/generate-user-code');
}

function getUser(input) {
  const json = storage.readFromJson();
  // hier krijgen we een array terug van de gebruiker
  console.log('get User: ');
  console.log(json.find(user => user.id == input.userid));
  return json.find(user => user.id == input.userid);
}

function renderNewRoute(input, res) {
  const existingUser = getUser(input);
  let unanswerdCategories = [];

  if (existingUser) {
    const allcategories = [
      'vraag1',
      'vraag2',
      'vraag3',
      'vraag4',
      'vraag5',
      'vraag6',
      'vraag7',
      'finished',
    ];

    allcategories.forEach(category => {
      if (!(category in existingUser)) {
        unanswerdCategories.push(category);
      }
    });
  }
  console.log('unanswered');
  console.log(unanswerdCategories);
  // TO DO: maak hier een redirect van -> /unanswerdCategories[0]/existingUser.id
  res.render(unanswerdCategories[0], {
    userid: existingUser.id,
    style: './css/styles.css',
    script: './../js/main.js',
    answer: '',
  });
}
