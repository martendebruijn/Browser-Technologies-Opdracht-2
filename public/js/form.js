import { getInput, checkIfEmpty, checkPattern, createError } from './main.js';

function validationName() {
  return function(e) {
    e.preventDefault();
    const input = getInput('name');
    const empty = checkIfEmpty(input);
    const pattern = /^[A-Za-z -]+/g;
    const valid = checkPattern(input, pattern);
    if ((empty && !valid) || empty) {
      const message = 'Vul alsjeblieft je naam in.';
      createError(message);
    } else if (!empty && !valid) {
      const message =
        'Gebruik alleen kleineletters, hoofletters, koppeltekens of spaties.';
      createError(message);
    }
  };
}
document.addEventListener('invalid', validationName(), true);
