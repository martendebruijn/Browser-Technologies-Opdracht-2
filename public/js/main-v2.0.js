/* TODO
add everything to ls
fix header birthday
add input type color
add input type date
fix 18 years issue
fix birthday dot issue
terug btn
fix submit
*/

const form = document.querySelector('form'),
  submitBtn = document.querySelector('.sub'),
  nameEl = document.getElementById('input1'),
  ageHeader = document.getElementById('js-ageHeader'),
  colorHeader = document.getElementById('js-colorHeader'),
  birthHeader = document.getElementById('js-birthdayHeader'),
  gradeHeader = document.getElementById('js-gradeHeader'),
  radios = document.getElementsByName('leeftijd'),
  colors = document.getElementById('color'),
  birthdayEl = document.getElementById('birthday'),
  gradeEl = document.getElementById('grade');

function addToLS(key, value) {
  localStorage.setItem(key, value);
}
function getLS(key) {
  localStorage.getItem(key);
}
/* Detect input type="date"
Source: https://quirksmode.org/html5/inputs/tests/inputs_js.html 
https://quirksmode.org/blog/archives/2015/03/better_modern_i.html */
function checkInput(prefType) {
  const test = document.createElement('input');
  let supported = false;
  test.type = prefType;
  if (test.type === prefType) {
    supported = true;
  }
  test.value = 'Hello World';
  const helloWorldAccepted = test.value === 'Hello World';
  if (helloWorldAccepted) {
    supported = false;
  }
  console.log(`${prefType} = ${supported}`);
  return supported;
}
function checkedRadioBtn(name) {
  radios.forEach(function (radio) {
    if (radio.checked) {
      const age = radio.value,
        today = new Date(),
        date = today.getFullYear();
      addToLS('age', age);
      const birthYear = date - age;
      birthHeader.innerText = `${name} je bent waarschijnlijk in ${birthYear} geboren.`;
    }
  });
}
function checkSelectedOption() {
  const sel = colors.options[colors.selectedIndex].value;
  addToLS('color', sel);
}

function doEverything() {
  const name = nameEl.value,
    birthday = birthdayEl.value,
    grade = gradeEl.value;
  addToLS('name', name);
  addToLS('birthday', birthday);
  addToLS('grade', grade);
  ageHeader.innerText = `${name}, hoe oud ben je?`;
  colorHeader.innerText = `${name}, wat is je favoriete kleur?`;
  gradeHeader.innerText = `${name}, welk cijfer zou jij deze minor geven?`;
  checkedRadioBtn(name);
  checkSelectedOption();
}

submitBtn.addEventListener('click', function (e) {
  doEverything();
});

document.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    doEverything();
  }
});
checkInput('date');
checkInput('color');
if (checkInput('date')) {
  // render date input
}
if (checkInput('color')) {
  // render color input
}
