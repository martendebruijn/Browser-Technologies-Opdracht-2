import { getInput } from './main.js';
const slider = getInput('cijfer');
const rangeEl = document.querySelector('.js-slider');
slider.oninput = function() {
  rangeEl.innerText = this.value;
};
