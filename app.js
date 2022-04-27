// btn tema night/light
let dark = false;
const temaBtn = document.querySelector('#temaBtn');
const body = document.querySelector('body');

temaBtn.addEventListener('click', () => {
  dark = !dark;

  if (dark) {
    body.classList.remove('tema-light');
    body.classList.add('tema-night')
  } else {
    body.classList.remove('tema-night');
    body.classList.add('tema-light');
  }
});