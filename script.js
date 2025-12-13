let carrito = [];
const contenedor = document.getElementById("productos");
const carritoDiv = document.getElementById("carrito");
const checkout = document.getElementById("checkout");
const selectPais = document.getElementById("pais");

// 🌍 Lista de países
const paises = ["Afghanistan","Argentina","Australia","Brazil","Canada","Chile","Colombia","France","Germany","Italy","Mexico","Spain","UAE","UK","USA","Venezuela","Peru","Portugal","Japan","China"];
paises.forEach(p => selectPais.innerHTML += `<option>${p}</option>`);

// 🔹 Función para cargar productos desde API (simulado)
async function cargarProductos() {
  try {
    // Aquí reemplazas con tu API real: Amazon, Booking, Skyscanner
    const response = await fetch('https://api-simulada.com/productos'); // Simulado
    const data = await response.json();

    // Mapear datos al formato de nuestra página
    window.productos = data.map((p,i)=>({
      id: i+1,
      nombre: p.nombre,
      marca: p.marca,
      categoria: p.categoria,
      precio: p.precio,
      imagen: p.imagen,
      proveedor: p.proveedor,
      link: p.link
    }));

    mostrar(productos);
  } catch (error) {
    console.error("Error cargando productos:", error);
    // Si falla, mostramos productos de ejemplo
    window.productos = productosSimulados();
    mostrar(window.productos);
  }
}

// 🔹 Productos de ejemplo
function productosSimulados(){
  return [
    {id:1,nombre:"iPhone 15 Pro",marca:"Apple",categoria:"tecnologia",precio:999,imagen:"https://via.placeholder.com/200",proveedor:"Amazon"},
    {id:2,nombre:"MacBook Air M3",marca:"Apple",categoria:"tecnologia",precio:1299,imagen:"https://via.placeholder.com/200",proveedor:"Apple Store"},
    {id:3,nombre:"Hoodie Nike",marca:"Nike",categoria:"ropa",precio:69,imagen:"https://via.placeholder.com/200",proveedor:"Nike"},
    {id:4,nombre:"Hotel 5★ París",marca:"Hilton",categoria:"hoteles",precio:480,imagen:"https://via.placeholder.com/200",proveedor:"Booking"},
    {id:5,nombre:"Vuelo Dubái → Madrid",marca:"Emirates",categoria:"vuelos",precio:650,imagen:"https://via.placeholder.com/200",proveedor:"Skyscanner"},
    {id:6,nombre:"Drone DJI Mini 3",marca:"DJI",categoria:"gadgets",precio:499,imagen:"https://via.placeholder.com/200",proveedor:"DJI"}
  ];
}

// 🔹 Mostrar productos
function mostrar(lista) {
  contenedor.innerHTML = "";
  lista.forEach(p=>{
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

// 🔹 Filtrar por categoría
function filtrar(cat) {
  if(cat==="todos") mostrar(window.productos);
  else mostrar(window.productos.filter(p=>p.categoria===cat));
}

// 🔹 Carrito profesional
function agregar(id){
  const prod = window.productos.find(p=>p.id===id);
  const item = carrito.find(p=>p.id===id);
  if(item) item.cantidad++;
  else carrito.push({...prod,cantidad:1});
  alert(`Agregado al carrito: ${prod.nombre}`);
}

function cambiarCantidad(id,delta){
  const item = carrito.find(p=>p.id===id);
  item.cantidad += delta;
  if(item.cantidad<=0) carrito = carrito.filter(p=>p.id!==id);
  mostrarCheckout();
}

// 🔹 Mostrar checkout
function mostrarCheckout(){
  checkout.classList.remove("oculto");
  carritoDiv.innerHTML="<h3>🛒 Carrito</h3>";
  let total = 0;
  carrito.forEach(p=>{
    carritoDiv.innerHTML += `
      <p>${p.nombre} — $${p.precio} x ${p.cantidad}
      <button onclick="cambiarCantidad(${p.id},1)">+</button>
      <button onclick="cambiarCantidad(${p.id},-1)">-</button></p>`;
    total += p.precio*p.cantidad;
  });
  carritoDiv.innerHTML += `<h3>Total: $${total}</h3>`;
}

// 🔹 Pago con Stripe y entrega simulada
function pagar(){
  if(carrito.length===0){ alert("Carrito vacío"); return; }
  const nombre=document.getElementById("nombre").value;
  const direccion=document.getElementById("direccion").value;
  const pais=document.getElementById("pais").value;
  const email=document.getElementById("email").value;

  if(!nombre||!direccion||!pais||!email){ alert("Completa todos los datos"); return; }

  // Simular entrega automática
  alert(`Pedido confirmado para ${nombre}, ${direccion}, ${pais}. Total: $${carrito.reduce((sum,p)=>sum+p.precio*p.cantidad,0)}\n¡Enviado automáticamente a tu proveedor!`);

  // Integrar Stripe real
  const stripe=Stripe("TU_CLAVE_PUBLICA_STRIPE_AQUI");
  stripe.redirectToCheckout({
    lineItems: carrito.map(p=>({price_data:{currency:"usd",product_data:{name:p.nombre},unit_amount:p.precio*100},quantity:p.cantidad})),
    mode:"payment",
    successUrl:window.location.href,
    cancelUrl:window.location.href
  });
}

// 🔹 Inicializar
cargarProductos();
