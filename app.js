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

// sweet alert tienda
function sweetAlert() {
    Swal.fire({
        icon: 'success',
        title: 'Listo',
        text: 'Tu mensaje ha sido enviado!',
        footer: '<a href="index.html"Desea volver a la página inicial?</a>',
        timer: 5000,
        timerprogressBar: true
    })
}