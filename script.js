const productos = [
  { id:1, nombre:"iPhone 15 Pro", marca:"Apple", categoria:"tecnologia", precio:999, proveedor:"Amazon" },
  { id:2, nombre:"Galaxy S24 Ultra", marca:"Samsung", categoria:"tecnologia", precio:899, proveedor:"Samsung Store" },
  { id:3, nombre:"AirPods Pro", marca:"Apple", categoria:"tecnologia", precio:249, proveedor:"BestBuy" },
  { id:4, nombre:"Hoodie Nike", marca:"Nike", categoria:"ropa", precio:69, proveedor:"Nike Store" },
  { id:5, nombre:"Sneakers Adidas", marca:"Adidas", categoria:"ropa", precio:89, proveedor:"Adidas" },
  { id:6, nombre:"Vuelo Dubái → Madrid", marca:"Emirates", categoria:"vuelos", precio:650, proveedor:"Skyscanner" },
  { id:7, nombre:"Vuelo París → Roma", marca:"Air France", categoria:"vuelos", precio:180, proveedor:"Amadeus" },
  { id:8, nombre:"Hotel 5★ París (3 noches)", marca:"Hilton", categoria:"hoteles", precio:480, proveedor:"Booking" },
  { id:9, nombre:"Hotel Dubai Marina", marca:"Marriott", categoria:"hoteles", precio:520, proveedor:"Expedia" }
];

let carrito = [];

const contenedor = document.getElementById("productos");
const carritoDiv = document.getElementById("carrito");
const checkout = document.getElementById("checkout");

function mostrar(lista) {
  contenedor.innerHTML = "";
  lista.forEach(p => {
    contenedor.innerHTML += `
      <div class="card">
        <h3>${p.nombre}</h3>
        <small>${p.marca} • ${p.proveedor}</small>
        <p><strong>$${p.precio}</strong></p>
        <button onclick="agregar(${p.id})">Agregar al carrito</button>
      </div>
    `;
  });
}

function filtrar(cat) {
  if (cat === "todos") mostrar(productos);
  else mostrar(productos.filter(p => p.categoria === cat));
}

function agregar(id) {
  const prod = productos.find(p => p.id === id);
  const item = carrito.find(p => p.id === id);

  if (item) item.cantidad++;
  else carrito.push({ ...prod, cantidad: 1 });

  alert("Producto agregado al carrito");
}

function mostrarCheckout() {
  checkout.classList.remove("oculto");
  carritoDiv.innerHTML = "<h3>🛒 Tu carrito</h3>";
  let total = 0;

  carrito.forEach(p => {
    carritoDiv.innerHTML += `<p>${p.nombre} x${p.cantidad} — $${p.precio * p.cantidad}</p>`;
    total += p.precio * p.cantidad;
  });

  carritoDiv.innerHTML += `<h3>Total: $${total}</h3>`;
}

function pagar() {
  alert("Aquí se integran Stripe / PayPal / Afiliados");
}

mostrar(productos);
