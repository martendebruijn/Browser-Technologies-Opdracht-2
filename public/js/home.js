const ul = document.querySelector('.home-links'),
  continueBtn = `<li><button id="js-continueBtn">Ga verder</button></li>`,
  startBtn = `<li><button id="js-startBtn">Naar de enquête</button></li>`;
ul.innerHTML = continueBtn + startBtn;

const newStartBtn = document.getElementById('js-startBtn'),
  newContinueBtn = document.getElementById('js-continueBtn');

newStartBtn.addEventListener('click', function (e) {
  localStorage.clear();
  window.location.href = window.location.href + '/enquete';
});
newContinueBtn.addEventListener('click', function (e) {
  window.location.href = window.location.href + '/enquete';
});
