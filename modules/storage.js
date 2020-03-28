const fs = require('file-system');

module.exports = {
  addDataToArray,
  readFromJson,
  setup,
  checkAnswer,
};

function checkAnswer(userid, name, route, res) {
  console.log(name);
  console.log(route);
  const json = readFromJson();
  const user = json.find(user => user.id === userid);
  const index = json.map(o => o.id).indexOf(user.id);

  const data = json[index];
  const vraagObj = data[`${name}`];
  console.log(data);
  let answer = '';
  console.log('vraag obj: ');
  console.log(vraagObj);
  if (vraagObj) {
    const objKeys = Object.keys(vraagObj);
    const key = objKeys[0];
    answer = vraagObj[key];
  }
  console.log('answer: ');
  console.log(answer);

  res.render(route, {
    userid: userid,
    style: './../css/styles.css',
    script: './../js/main.js',
    answer: answer,
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
  // console.log('write: ');
  // console.log(content);
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
