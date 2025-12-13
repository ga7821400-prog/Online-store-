const productos = [
  { nombre: "Audífonos Bluetooth", precio: 29 },
  { nombre: "Smartwatch Deportivo", precio: 49 },
  { nombre: "Cargador USB-C Rápido", precio: 19 },
  { nombre: "Power Bank 20.000mAh", precio: 39 },
  { nombre: "Pantalla iPhone XR", precio: 59 },
  { nombre: "Batería iPhone XR", precio: 25 },
  { nombre: "Fader DJ Pioneer", precio: 99 },
  { nombre: "Cable XLR Profesional", precio: 35 },
  { nombre: "Hoodie Oversized", precio: 45 },
  { nombre: "Audífonos Gaming", precio: 55 }
];

let carrito = [];

const contenedor = document.getElementById("productos");
const carritoDiv = document.getElementById("carrito");
const checkout = document.getElementById("checkout");

productos.forEach((p, i) => {
  contenedor.innerHTML += `
    <div class="card">
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
      <button onclick="agregar(${i})">Agregar al carrito</button>
    </div>
  `;
});

function agregar(i) {
  carrito.push(productos[i]);
  alert("Producto agregado al carrito");
}

function mostrarCheckout() {
  checkout.classList.remove("oculto");
  carritoDiv.innerHTML = "<h3>Tu carrito</h3>";
  let total = 0;

  carrito.forEach(p => {
    carritoDiv.innerHTML += `<p>${p.nombre} - $${p.precio}</p>`;
    total += p.precio;
  });

  carritoDiv.innerHTML += `<h3>Total: $${total}</h3>`;
}

function pagar() {
  alert("Aquí conectaremos Stripe / PayPal");
}
