// Productos y servicios reales simulados
const productos = [
  // Tecnología
  { id:1, categoria:"Tecnología", nombre:"iPhone 15 Pro", precio:1200, imagen:"https://images.unsplash.com/photo-1685226111426-2e1f2f9c9f6d?crop=entropy&cs=tinysrgb&fit=max&h=180&w=220" },
  { id:2, categoria:"Tecnología", nombre:"MacBook Pro 16\"", precio:2500, imagen:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&h=180&w=220" },
  { id:3, categoria:"Tecnología", nombre:"Samsung Galaxy S23", precio:999, imagen:"https://images.unsplash.com/photo-1685203513847-f4df78c1b6c1?crop=entropy&cs=tinysrgb&fit=max&h=180&w=220" },
  // Ropa
  { id:4, categoria:"Ropa", nombre:"Zapatillas Nike Air", precio:120, imagen:"https://images.unsplash.com/photo-1600180758895-95b36c5ee4e3?crop=entropy&cs=tinysrgb&fit=max&h=180&w=220" },
  { id:5, categoria:"Ropa", nombre:"Chaqueta Adidas", precio:80, imagen:"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?crop=entropy&cs=tinysrgb&fit=max&h=180&w=220" },
  // Vuelos
  { id:6, categoria:"Vuelos", nombre:"Vuelo a Nueva York - Delta", precio:450, imagen:"https://images.unsplash.com/photo-1514474959185-6fa1a6d6a8f8?crop=entropy&cs=tinysrgb&fit=max&h=180&w=220" },
  { id:7, categoria:"Vuelos", nombre:"Vuelo a París - Air France", precio:550, imagen:"https://images.unsplash.com/photo-1504198453319-5ce911bafcde?crop=entropy&cs=tinysrgb&fit=max&h=180&w=220" },
  // Hoteles
  { id:8, categoria:"Hoteles", nombre:"Hotel 5 Estrellas París", precio:400, imagen:"https://images.unsplash.com/photo-1582719478186-bbff01b6c17e?crop=entropy&cs=tinysrgb&fit=max&h=180&w=220" },
  { id:9, categoria:"Hoteles", nombre:"Hotel Nueva York 4*", precio:350, imagen:"https://images.unsplash.com/photo-1542317854-1b8a8bdf76c2?crop=entropy&cs=tinysrgb&fit=max&h=180&w=220" }
];

let carrito = [];

const lista = document.getElementById("lista-productos");
const carritoLista = document.getElementById("carrito-lista");
const totalP = document.getElementById("total");
const metodoPago = document.getElementById("pago-seleccion");

// Mostrar productos por categoría
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

// Filtros
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
  carrito.forEach((p,i)=>{
    total += p.precio;
    carritoLista.innerHTML += `<p>${p.nombre} - $${p.precio} <button onclick="eliminarCarrito(${i})">Eliminar</button></p>`;
  });
  totalP.textContent = `Total: $${total}`;
}

// Eliminar del carrito
function eliminarCarrito(index){
  carrito.splice(index,1);
  mostrarCarrito();
}

// Pago simulado
document.getElementById("pagar").addEventListener("click", ()=>{
  if(carrito.length===0){ alert("El carrito está vacío"); return; }
  let metodo = metodoPago.value;
  let mensaje = `Pago realizado con ${metodo}!\nOrden enviada a proveedores:\n`;
  carrito.forEach(p=>mensaje+=`- ${p.nombre} ($${p.precio})\n`);
  alert(mensaje + `Total: $${carrito.reduce((a,b)=>a+b.precio,0)}`);
  carrito=[];
  mostrarCarrito();
});

// Inicial
mostrarProductos();

// Formulario de contacto
const form = document.getElementById("form-contacto");
form.addEventListener("submit",(e)=>{
  e.preventDefault();
  alert(`Gracias ${document.getElementById("nombre").value}, tu mensaje ha sido enviado!`);
  form.reset();
});
