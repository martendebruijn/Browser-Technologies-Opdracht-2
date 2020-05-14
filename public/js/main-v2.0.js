/* TODO
[x] add everything to ls
[x] fix header birthday
[x] add input type color
[x] add input type date
[x] add input type range
[x] fix 18 years issue
[x] fix birthday dot issue
[ ] terug btn
[ ] fix submit
[x] fix .hints
[ ] add color and range only to localstoragge when the rest is done
[ ] read and enter everything from localstorage
*/

const form = document.querySelector('form'),
  submitBtn = document.querySelector('.sub'),
  nameEl = document.getElementById('input1'),
  ageHeader = document.getElementById('js-ageHeader'),
  colorHeader = document.getElementById('js-colorHeader'),
  birthHeader = document.getElementById('js-birthdayHeader'),
  gradeHeader = document.getElementById('js-gradeHeader'),
  radios = document.getElementsByName('leeftijd'),
  backBtn = document.querySelector('.back'),
  btnsWrapper = document.querySelector('.btns'),
  dotThree = document.getElementById('js-dotThree'),
  dotFive = document.getElementById('js-dotFive');

let colors = document.getElementById('color'),
  n = 0,
  gradeEl = document.getElementById('grade'),
  birthdayEl = document.getElementById('birthday');

backBtn.classList.remove('d-none');
btnsWrapper.style.justifyContent = 'space-evenly';

function addToLS(key, value) {
  localStorage.setItem(key, value);
}
function getLS(key) {
  const val = localStorage.getItem(key);
  console.log(key + ' ' + val);
  return val;
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
if (checkInput('date')) {
  birthdayEl.outerHTML = `<input  id="birthday" type="date" name="verjaardag" required min="1980-01-01" max="2002-01-01"/>`;
  birthdayEl = document.getElementById('birthday');
}
if (checkInput('color')) {
  colors.outerHTML = `<input id="color" type="color" name="kleur" required>`;
  colors = document.getElementById('color');
  dotThree.classList.add('white-dot');
}
if (checkInput('range')) {
  gradeEl.outerHTML = `<input type="range" min="1" value="" max="10" name="grade" id="grade" required>`;
  gradeEl = document.getElementById('grade');
  dotFive.classList.add('white-dot');
}
function checkedRadioBtn(name) {
  radios.forEach(function (radio) {
    if (radio.checked) {
      const age = radio.value,
        today = new Date(),
        date = today.getFullYear();
      addToLS('age', age);
      const birthYear = date - age;
      birthHeader.innerHTML = `${name} je bent waarschijnlijk in ${birthYear} geboren.
      <h3>Vul hieronder je geboortedatum in:</h3>
      <span class="progress-dot dot-four" tabindex="1"></span> 
      <div class="hints">
          <p>Toegestaan formaat:</p>
          <p>DD-MM-YYYY</p>
      </div>`;
    }
  });
}
function checkSelectedOption() {
  const sel = colors.options[colors.selectedIndex].value;
  addToLS('color', sel);
}

document.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    // doEverything(e);
    e.preventDefault();
  }
});

const questionArray = [nameEl, ageHeader, colors, birthdayEl, gradeEl, gradeEl];
let qnr = 0;
submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (qnr < 5) {
    qnr++;
  } else if (qnr >= 5) {
    qnr = 0;
  }
  console.log(qnr);
  focusOnQNR(qnr);
});
backBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (qnr <= 5 && qnr > 0) {
    qnr--;
  } else if (qnr <= 0) {
    qnr = 0;
  }
  console.log(qnr);
  focusOnQNR(qnr);
});
function focusOnQNR(qnr, name) {
  const out = document.getElementById('js-gradeOutput');
  if (qnr === 1) {
    nameQuestion();
  } else if (qnr === 2) {
    const _name = nameEl.value;
    checkedRadioBtn(_name);
  } else if (qnr === 3) {
    if (!checkInput('color')) {
      checkSelectedOption();
    } else if (checkInput('color')) {
      addToLS('color', colors.value);
    }
  } else if (qnr === 4) {
    const birthday = birthdayEl.value;
    addToLS('birthday', birthday);
  } else if (qnr === 5) {
    const grade = gradeEl.value;
    addToLS('grade', grade);
  }
  if (
    colors.classList.contains('color-input') &&
    colorHeader.classList.contains('color-label')
  ) {
    colors.classList.remove('color-input');
    colorHeader.classList.remove('color-label');
  }
  if (!out.classList.contains('d-none')) {
    out.classList.add('d-none');
  }
  if (qnr === 2 && checkInput('color')) {
    colorHeader.focus();
    colors.classList.add('color-input');
    colorHeader.classList.add('color-label');
    dotThree.classList.remove('white-dot');
  } else if (qnr === 4 && checkInput('range')) {
    gradeEl.focus();
    dotFive.classList.remove('white-dot');
    out.classList.remove('d-none');
    gradeEl.oninput = function () {
      out.innerText = this.value;
    };
  } else {
    questionArray[qnr].focus();
  }
}
focusOnQNR(qnr);

// if (getLS('name')) {
//   nameEl.value = getLS('name');
//   qnr = 1;
// }
// if (getLS('age')) {
//   radios.forEach(function (radio) {
//     if (radio.value == getLS('age')) {
//       radio.checked = true;
//       qnr = 2;
//     }
//   });
// }
getLS('color');
getLS('birthday');
getLS('grade');
function nameQuestion() {
  const name = nameEl.value;
  if (name) {
    addToLS('name', name);
    ageHeader.innerText = `${name}, hoe oud ben je?`;
    if (checkInput('color') && qnr < 2) {
      colorHeader.innerHTML = `${name}, wat is je favoriete kleur?
    <span id="js-dotThree" class="progress-dot dot-three white-dot" tabindex="1"></span> `;
    } else if (checkInput('color')) {
      colorHeader.innerHTML = `${name}, wat is je favoriete kleur?
    <span id="js-dotThree" class="progress-dot dot-three" tabindex="1"></span> `;
    } else {
      colorHeader.innerHTML = `${name}, wat is je favoriete kleur?`;
    }
    if (checkInput('range') && qnr < 4) {
      gradeHeader.innerHTML = `${name}, welk cijfer zou jij deze minor geven?
          <span id="js-dotFive" class="progress-dot dot-five white-dot" tabindex="1"></span> 
          <ul class="hints">
              <p>Toegestane tekens:</p>
              <li>1 t/m 9</li>
              <li>10</li>
          </ul>`;
    } else if (checkInput('range')) {
      gradeHeader.innerHTML = `${name}, welk cijfer zou jij deze minor geven?
          <span id="js-dotFive" class="progress-dot dot-five white-dot" tabindex="1"></span> 
          <ul class="hints">
              <p>Toegestane tekens:</p>
              <li>1 t/m 9</li>
              <li>10</li>
          </ul>`;
    } else {
      gradeHeader.innerText = `${name}, welk cijfer zou jij deze minor geven?`;
    }
  }
}
