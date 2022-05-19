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


// //carrito-api
// const items = document.getElementById("items")
// const templateCard = document.getElementById("template-card").content      //content para acceder a los elementos
// const fragment = document.createDocumentFragment               // repasar FRAGMENT

// document.addEventListener("DOMContentLoaded", () => {
//   fetchData()
// })

// const fetchData = async () => {             //repasar FETCH.
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
//       templateCard.querySelector("h5").textContent = producto.name

//       const clone = templateCard.cloneNode(true)
//       fragment.appendChild(clone)
//   })
//   items.appendChild(fragment)
// }





// carrito-api 2

let carrito = [];
const divisa = '€';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones

/**
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */


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
      "imagen": "../assets/tienda8.jpg"
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

// const baseDeDatos = fetch("./api.json")
// baseDeDatos(JSON)

function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4', "tema-tienda-card", "m-1", "mb-3", "shadow", "col-lg-12", "p-0", "m-0", "col-md-6", "col-lg-4");
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title', "tema-card-text", "pt-4");
        miNodoTitle.textContent = info.nombre;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text', "tema-card-text");
        miNodoPrecio.textContent = `${info.precio}${divisa}`;
        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary', "shadow-sm");
        miNodoBoton.textContent = 'Añadir al carrito';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

/**
 * Evento para añadir un producto al carrito de la compra
 */
function anyadirProductoAlCarrito(evento) {
    // Anyadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    // Actualizamos el carrito 
    renderizarCarrito();

}

/**
 * Dibuja todos los productos guardados en el carrito
 */
function renderizarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    // Renderizamos el precio total en el HTML
    DOMtotal.textContent = calcularTotal();
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

/**
 * Varia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarProductos();
renderizarCarrito();






// // carrito 3

// const itemsTienda2 = [
//   {
//       "id": 1,
//       "nombre": "Violín Parker",
//       "precio": 19000.00,
//       "imagen": "../assets/tienda1.jpg"

//   },
//   {
//       "id": 2,
//       "nombre": "Guitarra Black",
//       "precio": 149999.99,
//       "imagen": "../assets/tienda2.jpg"
//   },
//   {
//       "id": 3,
//       "nombre": "Teclado Casio",
//       "precio": 11500.00,
//       "imagen": "../assets/tienda3.jpg"
//   },
//   {
//       "id": 4,
//       "nombre": "Guitarra Criolla",
//       "precio": 7000.00,
//       "imagen": "../assets/tienda4.jpg"
//   },
//   {
//       "id": 5,
//       "nombre": "Micrófono",
//       "precio": 2000.00,
//       "imagen": "../assets/tienda5.jpg"
//   },
//   {
//       "id": 6,
//       "nombre": "Guitarra Maple",
//       "precio": 14000.00,
//       "imagen": "../assets/tienda6.jpg"
//   },
//   {
//       "id": 7,
//       "nombre": "Guitarra Fender",
//       "precio": 82000.00,
//       "imagen": "../assets/tienda7.jpg"
//   },
//   {
//       "id": 8,
//       "nombre": "Amplificador WS",
//       "precio": 34999.99,
//       "imagen": "../assets/tienda8.jpg"
//   },
//   {
//       "id": 9,
//       "nombre": "Batería Kit",
//       "precio": 52000.00,
//       "imagen": "../assets/tienda9.jpg"
//   },
//   {
//       "id": 10,
//       "nombre": "Teclado Yamaha",
//       "precio": 21000.00,
//       "imagen": "../assets/tienda10.jpg"
//   },
//   {
//       "id": 11,
//       "nombre": "Sintetizador KCL",
//       "precio": 17000.00,
//       "imagen": "../assets/tienda11.jpg"
//   },
//   {
//       "id": 12,
//       "nombre": "Guitarra Zero",
//       "precio": 56000.00,
//       "imagen": "../assets/tienda12.jpg"
//   }
// ];

// const tiendaBtn = document.getElementsByClassName("btnTienda")

// tiendaBtn.addEventListener("click", anyadirProductoAlCarrito)

// function anyadirProductoAlCarrito(evento) {
//     // Anyadimos el Nodo a nuestro carrito
//     carrito.push(evento.target.getAttribute('marcador'))
//     // Actualizamos el carrito 
//     renderizarCarrito();

// }

// /**
//  * Dibuja todos los productos guardados en el carrito
//  */
// function renderizarCarrito() {
//     // Vaciamos todo el html
//     DOMcarrito.textContent = '';
//     // Quitamos los duplicados
//     const carritoSinDuplicados = [...new Set(carrito)];
//     // Generamos los Nodos a partir de carrito
//     carritoSinDuplicados.forEach((item) => {
//         // Obtenemos el item que necesitamos de la variable base de datos
//         const miItem = baseDeDatos.filter((itemBaseDatos) => {
//             // ¿Coincide las id? Solo puede existir un caso
//             return itemBaseDatos.id === parseInt(item);
//         });
//         // Cuenta el número de veces que se repite el producto
//         const numeroUnidadesItem = carrito.reduce((total, itemId) => {
//             // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
//             return itemId === item ? total += 1 : total;
//         }, 0);
//         // Creamos el nodo del item del carrito
//         const miNodo = document.createElement('li');
//         miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
//         miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
//         // Boton de borrar
//         const miBoton = document.createElement('button');
//         miBoton.classList.add('btn', 'btn-danger', 'mx-5');
//         miBoton.textContent = 'X';
//         miBoton.style.marginLeft = '1rem';
//         miBoton.dataset.item = item;
//         miBoton.addEventListener('click', borrarItemCarrito);
//         // Mezclamos nodos
//         miNodo.appendChild(miBoton);
//         DOMcarrito.appendChild(miNodo);
//     });
//     // Renderizamos el precio total en el HTML
//     DOMtotal.textContent = calcularTotal();
// }

// /**
//  * Evento para borrar un elemento del carrito
//  */
// function borrarItemCarrito(evento) {
//     // Obtenemos el producto ID que hay en el boton pulsado
//     const id = evento.target.dataset.item;
//     // Borramos todos los productos
//     carrito = carrito.filter((carritoId) => {
//         return carritoId !== id;
//     });
//     // volvemos a renderizar
//     renderizarCarrito();
// }

// /**
//  * Calcula el precio total teniendo en cuenta los productos repetidos
//  */
// function calcularTotal() {
//     // Recorremos el array del carrito 
//     return carrito.reduce((total, item) => {
//         // De cada elemento obtenemos su precio
//         const miItem = baseDeDatos.filter((itemBaseDatos) => {
//             return itemBaseDatos.id === parseInt(item);
//         });
//         // Los sumamos al total
//         return total + miItem[0].precio;
//     }, 0).toFixed(2);
// }

// /**
//  * Varia el carrito y vuelve a dibujarlo
//  */
// function vaciarCarrito() {
//     // Limpiamos los productos guardados
//     carrito = [];
//     // Renderizamos los cambios
//     renderizarCarrito();
// }

// // Eventos
// DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// // Inicio
// renderizarProductos();
// renderizarCarrito();
