const fs = require('file-system');

module.exports = {
  addDataToArray,
  readFromJson,
  setup,
  checkAnswer,
};

function checkDateFormat(date) {
  console.log('date: ');
  console.log(date);
  const pattern = /[0-9]{4}.(0[1-9]|1[012]).(0[1-9]|1[0-9]|2[0-9]|3[01])/g;
  const valid = pattern.test(date);
  console.log('valid: ');
  console.log(valid);
  if (!valid) {
    const splitStr = date.split('-');
    const reverseArr = splitStr.reverse();
    const joinArr = reverseArr.join('-');
    date = joinArr;
  }
  console.log('check: ');
  console.log(date);
  return date;
}

function checkAnswer(userid, name, route, res) {
  const json = readFromJson();
  const user = json.find(user => user.id === userid);
  const index = json.map(o => o.id).indexOf(user.id);
  const data = json[index];
  const vraagObj = data[name];
  let answer = '';
  let answerReversed = answer;
  if (vraagObj) {
    const objKeys = Object.keys(vraagObj);
    const key = objKeys[0];
    answer = vraagObj[key];
    if (key === 'verjaardag') {
      answerReversed = checkDateFormat(answer);
    }
  }

  res.render(route, {
    userid: userid,
    style: './../css/styles.css',
    script: './../js/main.js',
    answer,
    answerReversed,
  });
}

function addDataToArray(data, id, name) {
  const json = readFromJson();
  const user = json.find(user => user.id === id);
  const index = json.map(o => o.id).indexOf(user.id);
  console.log('id: ');
  console.log(id);
  json[index][`${name}`] = data;

  writeToJson(json);

  // res.render(route, {
  //   userid: id,
  //   style: './../css/styles.css',
  //   answer: '',
  // });
}

function readFromJson() {
  const readFile = fs.readFileSync('data/users.json');
  return JSON.parse(readFile);
}

function writeToJson(data) {
  const content = JSON.stringify(data, null, 2);

  fs.writeFileSync('data/users.json', content);
}

function setup(data, res) {
  const json = readFromJson();
  json.push({ id: data.usercode });
  writeToJson(json);
  res.render('vraag1', {
    userid: data.usercode,
    style: './../css/styles.css',
    answer: '',
    script: './../js/main.js',
  });
}
