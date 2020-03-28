function setItem(key, value) {
  localStorage.setItem(key, value);
}
function clearStorage() {
  localStorage.clear();
}
function add() {
  const key = 'key';
  const val = 'val';
  setItem(key, val);
}
