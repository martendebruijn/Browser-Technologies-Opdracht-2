import { getInput, checkIfEmpty, checkPattern, createError } from './main.js';

/* Detect input type="date"
Source: https://quirksmode.org/html5/inputs/tests/inputs_js.html 
https://quirksmode.org/blog/archives/2015/03/better_modern_i.html */
function checkDateInput() {
  const test = document.createElement('input');
  let supported = false;
  test.type = 'date';
  if (test.type === 'date') {
    supported = true;
  }
  test.value = 'Hello World';
  const helloWorldAccepted = test.value === 'Hello World';
  if (helloWorldAccepted) {
    supported = false;
  }
  return supported;
}

function validationDate() {
  return function (e) {
    e.preventDefault();
    const input = getInput('verjaardag');
    const empty = checkIfEmpty(input);
    const pattern = /(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}/g;
    const valid = checkPattern(input, pattern);
    if ((empty && !valid) || empty) {
      const message = 'Vul alsjeblieft je geboortedatum in (DD-MM-YYYY).';
      createError(message);
    } else if (!empty && !valid) {
      const message = 'Vul je geboortedatum in als 01-01-2002 (DD-MM-YYY).';
      createError(message);
    }
  };
}
function addDateInput() {
  if (checkDateInput()) {
    const el = document.getElementById('js-date');
    const answerEl = document.getElementById('js-date-answer');
    const answer = answerEl.innerText;
    el.innerHTML = `<input autofocus type="date" name="verjaardag" required max="2002-01-01" value="${answer}">`;
  }
}
addDateInput();
document.addEventListener('invalid', validationDate(), true);
