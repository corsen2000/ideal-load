import log from './lib';

log('Hello World!!');

console.log('window.preLoad', window.preLoad);
document.addEventListener("DOMContentLoaded", function() {
  console.log('window.preLoad', window.preLoad);
  document.getElementById('data').textContent = JSON.stringify(window.preLoad);
});