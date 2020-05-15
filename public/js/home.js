const ul = document.querySelector('.home-links'),
  startBtn = `<li><button id="js-startBtn">Naar de enquête</button></li>`;
ul.innerHTML = continueBtn + startBtn;

const newStartBtn = document.getElementById('js-startBtn');

newStartBtn.addEventListener('click', function (e) {
  localStorage.clear();
  window.location.href = window.location.href + 'v2/enquete';
});
