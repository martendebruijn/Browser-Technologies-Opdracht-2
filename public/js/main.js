/* form validation */
const form = document.forms[0];
export function getInput(name) {
  return form[name];
}
export function getFieldset(name) {
  return form.elements[name];
}
function removeError() {
  const el = document.querySelector('.error');
  if (el) {
    el.remove();
  }
}
export function createError(message) {
  removeError();
  const div = document.createElement('div');
  const p = document.createElement('p');
  div.classList.add('error');
  div.append(p);
  p.append(message);
  form.append(div);
}
export function checkIfEmpty(input) {
  return input.value === '';
}
export function checkPattern(input, pattern) {
  const value = input.value;
  const valid = pattern.test(value);
  return valid;
}
export function checkRadio(name) {
  let check = false;
  name.forEach(function(item) {
    if (item.checked) {
      check = true;
    }
  });
  if (!check) {
    const message = 'Kies één van de opties.';
    createError(message);
  }
}
export function validationRadio(name) {
  return function(e) {
    e.preventDefault();
    const radios = getFieldset(name);
    checkRadio(radios);
  };
}
function showThemeChooser() {
  const wrapper = document.querySelector('.theme-switcher');
  wrapper.classList.remove('hide');
}
showThemeChooser();
const root = document.documentElement;
const wrapper = document.querySelector('.theme-switcher');
const switcher = document.querySelector('.home');
const light = document.querySelector('.light');
const dark = document.querySelector('.dark');
switcher.addEventListener('click', openThemeSwitcher);
function openThemeSwitcher() {
  wrapper.classList.toggle('active');
}
light.addEventListener('click', lightTheme);
function lightTheme() {
  root.style.setProperty('--theme-color', 'white');
  root.style.setProperty('--theme-color-secundair', 'black');
}
dark.addEventListener('click', darkTheme);
function darkTheme() {
  root.style.setProperty('--theme-color', 'black');
  root.style.setProperty('--theme-color-secundair', 'white');
}
