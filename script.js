// 🔹 PRODUCTOS REALES Y DIVERSOS
const productos = [
  // TECNOLOGÍA
  {id:1,nombre:"iPhone 15 Pro",marca:"Apple",categoria:"tecnologia",precio:999},
  {id:2,nombre:"Samsung Galaxy S24",marca:"Samsung",categoria:"tecnologia",precio:899},
  {id:3,nombre:"MacBook Air M3",marca:"Apple",categoria:"tecnologia",precio:1299},
  {id:4,nombre:"Audífonos Sony WH-1000XM5",marca:"Sony",categoria:"tecnologia",precio:349},

  // ROPA
  {id:5,nombre:"Hoodie Nike",marca:"Nike",categoria:"ropa",precio:69},
  {id:6,nombre:"Sneakers Adidas",marca:"Adidas",categoria:"ropa",precio:89},
  {id:7,nombre:"Chaqueta Zara",marca:"Zara",categoria:"ropa",precio:79},

  // VUELOS
  {id:8,nombre:"Vuelo Dubái → Madrid",marca:"Emirates",categoria:"vuelos",precio:650},
  {id:9,nombre:"Vuelo París → Roma",marca:"Air France",categoria:"vuelos",precio:180},

  // HOTELES
  {id:10,nombre:"Hotel 5★ París (3 noches)",marca:"Hilton",categoria:"hoteles",precio:480},
  {id:11,nombre:"Hotel Dubai Marina",marca:"Marriott",categoria:"hoteles",precio:520}
];

let carrito = [];

const contenedor = document.getElementById("productos");
const carritoDiv = document.getElementById("carrito");
const checkout = document.getElementById("checkout");

// 🔹 MOSTRAR PRODUCTOS
function mostrar(lista) {
  contenedor.innerHTML = "";
  lista.forEach(p => {
    contenedor.innerHTML += `
      <div class="card">
        <h3>${p.nombre}</h3>
        <small>${p.marca}</small>
        <p><strong>$${p.precio}</strong></p>
        <button onclick="agregar(${p.id})">Agregar</button>
      </div>
    `;
  });
}

function filtrar(cat) {
  if (cat === "todos") mostrar(productos);
  else mostrar(productos.filter(p => p.categoria === cat));
}

// 🔹 CARRITO PROFESIONAL
function agregar(id) {
  const prod = productos.find(p => p.id === id);
  const item = carrito.find(p => p.id === id);

  if (item) item.cantidad++;
  else carrito.push({...prod, cantidad:1});
}

function cambiarCantidad(id, delta) {
  const item = carrito.find(p => p.id === id);
  item.cantidad += delta;
  if (item.cantidad <= 0) carrito = carrito.filter(p => p.id !== id);
  mostrarCheckout();
}

function mostrarCheckout() {
  checkout.classList.remove("oculto");
  carritoDiv.innerHTML = "<h3>🛒 Carrito</h3>";
  let total = 0;

  carrito.forEach(p => {
    carritoDiv.innerHTML += `
      <p>
        ${p.nombre} — $${p.precio} x ${p.cantidad}
        <button onclick="cambiarCantidad(${p.id},1)">+</button>
        <button onclick="cambiarCantidad(${p.id},-1)">-</button>
      </p>
    `;
    total += p.precio * p.cantidad;
  });

  carritoDiv.innerHTML += `<h3>Total: $${total}</h3>`;
}

// 🌍 LISTA DE TODOS LOS PAÍSES
const paises = [
  "Afghanistan","Argentina","Australia","Brazil","Canada","Chile","Colombia",
  "France","Germany","Italy","Mexico","Spain","United Arab Emirates",
  "United Kingdom","United States","Venezuela","Peru","Portugal","Japan","China"
];

const selectPais = document.getElementById("pais");
paises.forEach(p => {
  selectPais.innerHTML += `<option>${p}</option>`;
});

// 💳 STRIPE CHECKOUT (REAL)
function pagar() {
  const stripe = Stripe("TU_CLAVE_PUBLICA_STRIPE_AQUI");

  stripe.redirectToCheckout({
    lineItems: carrito.map(p => ({
      price_data: {
        currency: "usd",
        product_data: { name: p.nombre },
        unit_amount: p.precio * 100
      },
      quantity: p.cantidad
    })),
    mode: "payment",
    successUrl: window.location.href,
    cancelUrl: window.location.href
  });
}

mostrar(productos);
