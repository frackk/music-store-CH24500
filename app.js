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

// sweet alert contact
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


// //market cart

// const items = document.getElementById("items")
// const testCard = document.getElementById("test-card").content           // ".content" para acceder a los elementos !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// const fragment = document.createDocumentFragment                                     // repasar FRAGMENT

// document.addEventListener("DOMContentLoaded", () => {
//   fetchData()
// })

// const fetchData = async () => {              //repasar FETCH. !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//   try {
//     const res = await fetch("./api.json")
//     const data = await res.json()
//     //console.log(data)
//     pintarCards(data)
//   } catch (error) {
//     console.log(error)
//   }
// }

// const pintarCards = data => {
//   data.forEach(producto => {
//     console.log(producto)
//       testCard.querySelector("h5").textContent = producto.name

//       const clone = testCard.cloneNode(true)
//       fragment.appendChild(clone)
//   })
//   items.appendChild(fragment)
// }


// // const baseDeDatos = fetch("./api.json")
// // baseDeDatos(JSON)


// market cart intento 4

// json
baseDeDatos = [
  {
      "id": 1,
      "nombre": "Violín Parker",
      "precio": 19000.00,
      "imagen": "../assets/tienda1.jpg"

  },
  {
      "id": 2,
      "nombre": "Guitarra Black",
      "precio": 149999.99,
      "imagen": "../assets/tienda2.jpg"
  },
  {
      "id": 3,
      "nombre": "Teclado Casio",
      "precio": 11500.00,
      "imagen": "../assets/tienda3.jpg"
  },
  {
      "id": 4,
      "nombre": "Guitarra Criolla",
      "precio": 7000.00,
      "imagen": "../assets/tienda4.jpg"
  },
  {
      "id": 5,
      "nombre": "Micrófono",
      "precio": 2000.00,
      "imagen": "../assets/tienda5.jpg"
  },
  {
      "id": 6,
      "nombre": "Guitarra Maple",
      "precio": 14000.00,
      "imagen": "../assets/tienda6.jpg"
  },
  {
      "id": 7,
      "nombre": "Guitarra Fender",
      "precio": 82000.00,
      "imagen": "../assets/tienda7.jpg"
  },
  {
      "id": 8,
      "nombre": "Amplificador WS",
      "precio": 34999.99,
      "imagen": "../assets/tienda8.png"
  },
  {
      "id": 9,
      "nombre": "Batería Kit",
      "precio": 52000.00,
      "imagen": "../assets/tienda9.jpg"
  },
  {
      "id": 10,
      "nombre": "Teclado Yamaha",
      "precio": 21000.00,
      "imagen": "../assets/tienda10.jpg"
  },
  {
      "id": 11,
      "nombre": "Sintetizador KCL",
      "precio": 17000.00,
      "imagen": "../assets/tienda11.jpg"
  },
  {
      "id": 12,
      "nombre": "Guitarra Zero",
      "precio": 56000.00,
      "imagen": "../assets/tienda12.jpg"
  }
];

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');


function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // card
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-3', "tema-tienda-card", "shadow", "m-4");
        // body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title', "tema-card-text", "pt-4");
        miNodoTitle.textContent = info.nombre;
        // imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        // precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text', "tema-card-text");
        miNodoPrecio.textContent = `${info.precio}${divisa}`;
        // boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = 'Añadir al carrito';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);

        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

function anyadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    renderizarCarrito();

}

function renderizarCarrito() {
    DOMcarrito.textContent = '';
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2', "tema-tienda-card", "tema-text");
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
        // borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5', "shadow");
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    DOMtotal.textContent = calcularTotal();
}

function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    renderizarCarrito();
}

function calcularTotal() {
    return carrito.reduce((total, item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
}

DOMbotonVaciar.addEventListener('click', vaciarCarrito);

renderizarProductos();
renderizarCarrito();



// sweet alert tienda
function buyMarketCart() {
    Swal.fire({
        icon: 'error',
        title: 'Ups..',
        text: 'Ha habido un problema con tu compra :(',
        footer: '<a href="index.html"Desea volver a la página inicial?</a>',
        html:
        '<b>Ha habido un error con tu compra :(</b> <br>' +
        'si este error <b>persiste</b>, no dudes en ' +
        '<b><a href="contactactanos.html">Contactarnos</a></b>. ',
        timerprogressBar: true,
        showCloseButton: true,
    })
}

