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
// theme chooser
function showThemeChooser() {
  const wrapper = document.querySelector('.theme-switcher');
  wrapper.classList.remove('hide');
}
// check local storage
// Source: https://stackoverflow.com/questions/16427636/check-if-localstorage-is-available
function lsTest() {
  var test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}
if (lsTest() === true) {
  showThemeChooser();
  document.querySelector('.home').addEventListener('click', openThemeSwitcher);
  document.querySelector('.light').addEventListener('click', lightTheme);
  document.querySelector('.dark').addEventListener('click', darkTheme);
}
function openThemeSwitcher() {
  const wrapper = document.querySelector('.theme-switcher');
  wrapper.classList.toggle('active');
}
const root = document.documentElement;
function lightTheme() {
  localStorage.setItem('theme', 'light');
  root.style.setProperty('--theme-color', 'white');
  root.style.setProperty('--theme-color-secundair', 'black');
}
function darkTheme() {
  localStorage.setItem('theme', 'dark');
  root.style.setProperty('--theme-color', 'black');
  root.style.setProperty('--theme-color-secundair', 'white');
}
function setTheme() {
  const theme = localStorage.getItem('theme');
  if (theme === 'light') {
    root.style.setProperty('--theme-color', 'white');
    root.style.setProperty('--theme-color-secundair', 'black');
  } else if (theme === 'dark') {
    root.style.setProperty('--theme-color', 'black');
    root.style.setProperty('--theme-color-secundair', 'white');
  }
}
setTheme();
