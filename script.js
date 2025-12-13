const productos = [
  { id:1, categoria:"Tecnología", nombre:"Audífonos DJ", precio:50, imagen:"https://images.unsplash.com/photo-1511367461989-f85a21fda167?crop=entropy&cs=tinysrgb&fit=max&h=180&w=220" },
  { id:2, categoria:"Tecnología", nombre:"Laptop Gamer", precio:700, imagen:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&h=180&w=220" },
  { id:3, categoria:"Ropa", nombre:"Chaqueta Urbana", precio:80, imagen:"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?crop=entropy&cs=tinysrgb&fit=max&h=180&w=220" },
  { id:4, categoria:"Ropa", nombre:"Zapatillas Deportivas", precio:60, imagen:"https://images.unsplash.com/photo-1600180758895-95b36c5ee4e3?crop=entropy&cs=tinysrgb&fit=max&h=180&w=220" },
  { id:5, categoria:"Vuelos", nombre:"Vuelo a Nueva York", precio:300, imagen:"https://images.unsplash.com/photo-1514474959185-6fa1a6d6a8f8?crop=entropy&cs=tinysrgb&fit=max&h=180&w=220" },
  { id:6, categoria:"Hoteles", nombre:"Hotel 5 Estrellas París", precio:450, imagen:"https://images.unsplash.com/photo-1582719478186-bbff01b6c17e?crop=entropy&cs=tinysrgb&fit=max&h=180&w=220" }
];

let carrito = [];

const lista = document.getElementById("lista-productos");
const carritoLista = document.getElementById("carrito-lista");
const totalP = document.getElementById("total");

// Función para mostrar productos
function mostrarProductos(filtro="Todos") {
  lista.innerHTML = "";
  let filtrados = productos;
  if(filtro !== "Todos") filtrados = productos.filter(p => p.categoria === filtro);
  filtrados.forEach(p => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
      <button onclick="agregarCarrito(${p.id})">Agregar al carrito</button>
    `;
    lista.appendChild(div);
  });
}

// Filtrar por categoría
document.querySelectorAll('.categoria-filtros button').forEach(btn => {
  btn.addEventListener('click', () => mostrarProductos(btn.dataset.categoria));
});

// Agregar al carrito
function agregarCarrito(id){
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  mostrarCarrito();
}

// Mostrar carrito
function mostrarCarrito(){
  carritoLista.innerHTML = "";
  let total = 0;
  carrito.forEach((p, i) => {
    total += p.precio;
    carritoLista.innerHTML += `<p>${p.nombre} - $${p.precio} <button onclick="eliminarCarrito(${i})">Eliminar</button></p>`;
  });
  totalP.textContent = `Total: $${total}`;
}

// Eliminar producto del carrito
function eliminarCarrito(index){
  carrito.splice(index,1);
  mostrarCarrito();
}

// Pagar (simulado)
document.getElementById("pagar").addEventListener("click", ()=>{
  if(carrito.length === 0){ alert("El carrito está vacío"); return; }
  let mensaje = "¡Orden enviada a proveedores!\nProductos:\n";
  carrito.forEach(p=>mensaje+=`- ${p.nombre} ($${p.precio})\n`);
  alert(mensaje + `Total: $${carrito.reduce((a,b)=>a+b.precio,0)}`);
  carrito = [];
  mostrarCarrito();
});

// Inicial
mostrarProductos();

// Formulario de contacto
const form = document.getElementById("form-contacto");
form.addEventListener("submit", (e)=>{
  e.preventDefault();
  alert(`Gracias ${document.getElementById("nombre").value}, tu mensaje ha sido enviado!`);
  form.reset();
});
