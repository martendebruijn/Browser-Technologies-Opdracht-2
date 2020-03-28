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

function addDateInput() {
  if (checkDateInput()) {
    console.log('yes ik mag iets doen');
    const el = document.getElementById('js-date');
    el.innerHTML =
      '<input type="date" name="verjaardag" required max="2002-01-01">';
  }
}

addDateInput();
