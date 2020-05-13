const dots = document.querySelectorAll('.progress-dot');
let i = 0;
function removeActiveDot() {
  dots.forEach(function (item) {
    const check = item.classList.contains('active-dot');
    if (check) {
      item.classList.remove('active-dot');
    }
  });
}

function newActiveDot(i) {
  dots[i].classList.add('active-dot');
}

// removeActiveDot();
// i++;
// newActiveDot(i);

const allInput = document.querySelectorAll('input');
console.log(allInput);
