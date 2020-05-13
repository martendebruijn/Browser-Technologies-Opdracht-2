/* TODO
add everything to ls
fix header birthday
add input type color
add input type date
fix 18 years issue
fix birthday dot issue
*/

const form = document.querySelector('form'),
  submitBtn = document.querySelector('.sub'),
  nameEl = document.getElementById('input1'),
  ageHeader = document.getElementById('js-ageHeader'),
  colorHeader = document.getElementById('js-colorHeader'),
  birthHeader = document.getElementById('js-birthdayHeader'),
  gradeHeader = document.getElementById('js-gradeHeader'),
  radios = document.getElementsByName('leeftijd');

function addToLS(key, value) {
  localStorage.setItem(key, value);
}
function getLS(key) {
  localStorage.getItem(key);
}
function checkedRadioBtn(name) {
  radios.forEach(function (radio) {
    if (radio.checked) {
      const age = radio.value,
        today = new Date(),
        date = today.getFullYear();
      const birthYear = date - age;
      birthHeader.innerText = `${name} je bent waarschijnlijk in ${birthYear} geboren.`;
    }
  });
}

function doEverything() {
  const name = nameEl.value;
  ageHeader.innerText = `${name}, hoe oud ben je?`;
  colorHeader.innerText = `${name}, wat is je favoriete kleur?`;
  gradeHeader.innerText = `${name}, welk cijfer zou jij deze minor geven?`;
  checkedRadioBtn(name);
}

submitBtn.addEventListener('click', function (e) {
  doEverything();
});

document.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    doEverything();
  }
});
