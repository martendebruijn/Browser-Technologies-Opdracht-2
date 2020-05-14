/* TODO
[x] add everything to ls
[x] fix header birthday
[x] add input type color
[x] add input type date
[x] add input type range
[x] fix 18 years issue
[x] fix birthday dot issue
[x] terug btn
[x] fix submit
[x] fix .hints
[x] add color and range only to localstoragge when the rest is done
[x] read and enter everything from localstorage
[x] add localstorage reset
[ ] final test
[ ] README CONCLUSIE
[ ] color dot
[ ] grade dot
[ ] before submitting screen
*/

const form = document.querySelector('form'),
  nameEl = document.getElementById('input1'),
  ageHeader = document.getElementById('js-ageHeader'),
  colorHeader = document.getElementById('js-colorHeader'),
  birthHeader = document.getElementById('js-birthdayHeader'),
  radios = document.getElementsByName('leeftijd'),
  backBtn = document.querySelector('.back'),
  btnsWrapper = document.querySelector('.btns'),
  readyEl = document.getElementById('js-ready');

let colors = document.getElementById('color'),
  n = 0,
  gradeEl = document.getElementById('grade'),
  birthdayEl = document.getElementById('birthday'),
  submitBtn = document.querySelector('.sub'),
  dotThree = document.getElementById('js-dotThree'),
  dotFive = document.getElementById('js-dotFive'),
  gradeHeader = document.getElementById('js-gradeHeader');

backBtn.classList.remove('d-none');
btnsWrapper.style.justifyContent = 'space-evenly';
submitBtn.outerHTML = `<button class="sub">Volgende</button>`;
submitBtn = document.querySelector('.sub');

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

const questionArray = [nameEl, ageHeader, colors, birthdayEl, gradeEl, readyEl];
let qnr = 0;
function checkLSlength() {
  const l = localStorage.length;
  if (l >= 1) {
    qnr = l;
    changeHeaders();
  }
}
function checkDateFormat(date) {
  const pattern = /[0-9]{4}.(0[1-9]|1[012]).(0[1-9]|1[0-9]|2[0-9]|3[01])/g;
  const valid = pattern.test(date);
  if (!valid) {
    const splitStr = date.split('-');
    const reverseArr = splitStr.reverse();
    const joinArr = reverseArr.join('-');
    date = joinArr;
  }
  console.log('HIERO');
  console.log(date);
  return date;
}
submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (qnr < 5) {
    qnr++;
  } else if (localStorage.length === 5 && qnr === 5) {
    form.submit();
  } else if (qnr >= 5) {
    qnr = 0;
  }
  console.log(qnr);
  focusOnQNR(qnr);
});
backBtn.addEventListener('click', function (e) {
  e.preventDefault();
  //   readyEl.classList.add('d-none');
  if (qnr <= 5 && qnr > 0) {
    qnr--;
  } else if (qnr <= 0) {
    qnr = 0;
  }
  console.log(qnr);
  focusOnQNR(qnr);
});
function addName(__name) {
  if (__name && __name.length !== 0) {
    nameEl.value = __name;
  }
}
function addAge(__age) {
  if (__age && __age.length !== 0) {
    radios.forEach(function (radio) {
      if (radio.value == getLS('age')) {
        radio.checked = true;
      }
    });
  }
}
function addColor(__color) {
  if (__color && __color.length !== 0) {
    colors.value = __color;
  }
}
function addBirthday(__birthday, birthday) {
  if (__birthday && __birthday.length !== 0) {
    console.log(__birthday);
    __birthday = checkDateFormat(__birthday);
    birthday = __birthday;
    birthdayEl.value = __birthday;
  }
}

function focusOnQNR(qnr, name) {
  if (!readyEl.classList.contains('d-none') && qnr !== 5) {
    readyEl.classList.add('d-none');
  } else if (readyEl.classList.contains('d-none') && qnr === 5) {
    readyEl.classList.remove('d-none');
  }
  const __name = getLS('name'),
    __age = getLS('age'),
    __color = getLS('color'),
    __grade = getLS('grade');
  let __birthday = getLS('birthday');

  const out = document.getElementById('js-gradeOutput');
  if (qnr === 1) {
    addName(__name);
    nameQuestion();
    changeHeaders();
  } else if (qnr === 2) {
    addName(__name);
    addAge(__age);

    const _name = nameEl.value;
    checkedRadioBtn(_name);
  } else if (qnr === 3) {
    if (!checkInput('color')) {
      addName(__name);
      addAge(__age);
      addColor(__color);
      checkSelectedOption();
    } else if (checkInput('color')) {
      addName(__name);
      addAge(__age);
      addColor(__color);
      addToLS('color', colors.value);
    }
  } else if (qnr === 4) {
    let birthday = birthdayEl.value;
    addName(__name);
    addAge(__age);
    addColor(__color);
    addBirthday(__birthday, birthday);
    addToLS('birthday', birthday);
  } else if (qnr === 5) {
    let birthday = birthdayEl.value;
    let grade = gradeEl.value;
    addName(__name);
    addAge(__age);
    addColor(__color);
    addBirthday(__birthday, birthday);
    if (__grade && __grade.length !== 0) {
      console.log(__grade);
      grade = __grade;
      gradeEl.value = __grade;
    }

    addToLS('grade', grade);
  }
  // prettier-ignore
  if ( colors.classList.contains('color-input') && colorHeader.classList.contains('color-label') ) {
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
    console.log(qnr);
    questionArray[qnr].focus();
  }
}
checkLSlength();
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
// getLS('color');
// getLS('birthday');
// getLS('grade');
function nameQuestion() {
  const name = nameEl.value;
  addToLS('name', name);
}
function changeHeaders() {
  const name = getLS('name');
  if (name) {
    ageHeader.innerText = `${name}, hoe oud ben je?`;
    if (checkInput('color') && qnr < 2) {
      colorHeader.innerHTML = `${name}, wat is je favoriete kleur?
    <span id="js-dotThree" class="progress-dot dot-three white-dot" tabindex="1"></span> `;
      dotThree = document.getElementById('js-dotThree');
    } else if (checkInput('color') && qnr >= 2) {
      colorHeader.innerHTML = `${name}, wat is je favoriete kleur?
    <span id="js-dotThree" class="progress-dot dot-three" tabindex="1"></span> `;
      dotThree = document.getElementById('js-dotThree');
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
      dotFive = document.getElementById('js-dotFive');
      gradeHeader = document.getElementById('js-gradeHeader');
    } else if (checkInput('range') && qnr >= 4) {
      gradeHeader.innerHTML = `${name}, welk cijfer zou jij deze minor geven?
          <span id="js-dotFive" class="progress-dot dot-five white-dot" tabindex="1"></span> 
          <ul class="hints">
              <p>Toegestane tekens:</p>
              <li>1 t/m 9</li>
              <li>10</li>
          </ul>`;
      dotFive = document.getElementById('js-dotFive');
      gradeHeader = document.getElementById('js-gradeHeader');
    } else {
      gradeHeader.innerText = `${name}, welk cijfer zou jij deze minor geven?`;
      gradeHeader = document.getElementById('js-gradeHeader');
    }
  }
}
document.getElementById('js-dotOne').addEventListener('click', function (e) {
  const out = document.getElementById('js-gradeOutput');
  if (!out.classList.contains('d-none')) {
    out.classList.add('d-none');
  }
  // prettier-ignore
  if ( colors.classList.contains('color-input') && colorHeader.classList.contains('color-label') ) {
        colors.classList.remove('color-input');
        colorHeader.classList.remove('color-label');
      }
});
document.getElementById('js-dotTwo').addEventListener('click', function (e) {
  const out = document.getElementById('js-gradeOutput');
  if (!out.classList.contains('d-none')) {
    out.classList.add('d-none');
  }
  // prettier-ignore
  if ( colors.classList.contains('color-input') && colorHeader.classList.contains('color-label') ) {
        colors.classList.remove('color-input');
        colorHeader.classList.remove('color-label');
      }
});
document.getElementById('js-dotFour').addEventListener('click', function (e) {
  const out = document.getElementById('js-gradeOutput');
  if (!out.classList.contains('d-none')) {
    out.classList.add('d-none');
  }
  // prettier-ignore
  if ( colors.classList.contains('color-input') && colorHeader.classList.contains('color-label') ) {
    colors.classList.remove('color-input');
    colorHeader.classList.remove('color-label');
  }
});

document.getElementById('js-dotFive').addEventListener('click', function (e) {
  const out = document.getElementById('js-gradeOutput');
  // prettier-ignore
  if ( colors.classList.contains('color-input') && colorHeader.classList.contains('color-label') ) {
    colors.classList.remove('color-input');
    colorHeader.classList.remove('color-label');
}
  if (checkInput('range')) {
    out.classList.remove('d-none');
  }
});
