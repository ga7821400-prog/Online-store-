// 🔹 PRODUCTOS DIVERSOS
const productos = [
  // TECNOLOGÍA
  {id:1,nombre:"iPhone 15 Pro",marca:"Apple",categoria:"tecnologia",precio:999,imagen:"https://via.placeholder.com/200",proveedor:"Amazon"},
  {id:2,nombre:"Samsung Galaxy S24",marca:"Samsung",categoria:"tecnologia",precio:899,imagen:"https://via.placeholder.com/200",proveedor:"Samsung"},
  {id:3,nombre:"MacBook Air M3",marca:"Apple",categoria:"tecnologia",precio:1299,imagen:"https://via.placeholder.com/200",proveedor:"Apple Store"},
  {id:4,nombre:"Audífonos Sony WH-1000XM5",marca:"Sony",categoria:"tecnologia",precio:349,imagen:"https://via.placeholder.com/200",proveedor:"BestBuy"},
  {id:5,nombre:"Cámara Canon EOS R6",marca:"Canon",categoria:"tecnologia",precio:2199,imagen:"https://via.placeholder.com/200",proveedor:"Canon"},

  // ROPA
  {id:6,nombre:"Hoodie Nike",marca:"Nike",categoria:"ropa",precio:69,imagen:"https://via.placeholder.com/200",proveedor:"Nike"},
  {id:7,nombre:"Sneakers Adidas",marca:"Adidas",categoria:"ropa",precio:89,imagen:"https://via.placeholder.com/200",proveedor:"Adidas"},
  {id:8,nombre:"Chaqueta Zara",marca:"Zara",categoria:"ropa",precio:79,imagen:"https://via.placeholder.com/200",proveedor:"Zara"},
  {id:9,nombre:"Jeans Levi's",marca:"Levi's",categoria:"ropa",precio:99,imagen:"https://via.placeholder.com/200",proveedor:"Levi's"},

  // VUELOS
  {id:10,nombre:"Vuelo Dubái → Madrid",marca:"Emirates",categoria:"vuelos",precio:650,imagen:"https://via.placeholder.com/200",proveedor:"Skyscanner"},
  {id:11,nombre:"Vuelo París → Roma",marca:"Air France",categoria:"vuelos",precio:180,imagen:"https://via.placeholder.com/200",proveedor:"Skyscanner"},
  {id:12,nombre:"Vuelo NY → LA",marca:"Delta",categoria:"vuelos",precio:320,imagen:"https://via.placeholder.com/200",proveedor:"Skyscanner"},

  // HOTELES
  {id:13,nombre:"Hotel 5★ París (3 noches)",marca:"Hilton",categoria:"hoteles",precio:480,imagen:"https://via.placeholder.com/200",proveedor:"Booking"},
  {id:14,nombre:"Hotel Dubai Marina",marca:"Marriott",categoria:"hoteles",precio:520,imagen:"https://via.placeholder.com/200",proveedor:"Booking"},
  {id:15,nombre:"Hotel NY 4★",marca:"Sheraton",categoria:"hoteles",precio:400,imagen:"https://via.placeholder.com/200",proveedor:"Booking"},

  // GADGETS
  {id:16,nombre:"Power Bank 20000mAh",marca:"Xiaomi",categoria:"gadgets",precio:39,imagen:"https://via.placeholder.com/200",proveedor:"AliExpress"},
  {id:17,nombre:"Smartwatch Fitbit Versa 4",marca:"Fitbit",categoria:"gadgets",precio:149,imagen:"https://via.placeholder.com/200",proveedor:"Amazon"},
  {id:18,nombre:"Drone DJI Mini 3",marca:"DJI",categoria:"gadgets",precio:499,imagen:"https://via.placeholder.com/200",proveedor:"DJI"}
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
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <small>${p.marca} • ${p.proveedor}</small>
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
  if (item) {
    item.cantidad++;
  } else {
    carrito.push({...prod, cantidad:1});
  }
  alert(`Agregado al carrito: ${prod.nombre}`);
}

function cambiarCantidad(id, delta) {
  const item = carrito.find(p => p.id === id);
  item.cantidad += delta;
  if(item.cantidad <= 0) carrito = carrito.filter(p => p.id !== id);
  mostrarCheckout();
}

function mostrarCheckout() {
  checkout.classList.remove("oculto");
  carritoDiv.innerHTML = "<h3>🛒 Carrito</h3>";
  let total = 0;

  carrito.forEach(p => {
    carritoDiv.innerHTML += `
      <p>${p.nombre} — $${p.precio} x ${p.cantidad}
      <button onclick="cambiarCantidad(${p.id},1)">+</button>
      <button onclick="cambiarCantidad(${p.id},-1)">-</button></p>`;
    total += p.precio * p.cantidad;
  });

  carritoDiv.innerHTML += `<h3>Total: $${total}</h3>`;
}

// 🌍 SELECT PAÍSES
const paises = ["Afghanistan","Argentina","Australia","Brazil","Canada","Chile","Colombia","France","Germany","Italy","Mexico","Spain","United Arab Emirates","United Kingdom","United States","Venezuela","Peru","Portugal","Japan","China"];
const selectPais = document.getElementById("pais");
paises.forEach(p => selectPais.innerHTML += `<option>${p}</option>`);

// 💳 PAGO CON STRIPE
function pagar() {
  if(carrito.length === 0) { alert("El carrito está vacío"); return; }
  const nombre = document.getElementById("nombre").value;
  const direccion = document.getElementById("direccion").value;
  const pais = document.getElementById("pais").value;
  const email = document.getElementById("email").value;

  if(!nombre || !direccion || !pais || !email) { alert("Completa todos los datos"); return; }

  // ALERT SIMULANDO ENVÍO AUTOMÁTICO
  alert(`Pedido confirmado para ${nombre} en ${direccion}, ${pais}. Total: $${carrito.reduce((sum,p)=>sum+p.precio*p.cantidad,0)}`);

  // Aquí integras Stripe real
  const stripe = Stripe("TU_CLAVE_PUBLICA_STRIPE_AQUI");
  stripe.redirectToCheckout({
    lineItems: carrito.map(p => ({
      price_data: {
        currency:"usd",
        product_data:{name:p.nombre},
        unit_amount:p.precio*100
      },
      quantity:p.cantidad
    })),
    mode:"payment",
    successUrl:window.location.href,
    cancelUrl:window.location.href
  });
}

mostrar(productos);
