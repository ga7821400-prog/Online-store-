// Lista de productos de ejemplo
const productos = [
  { nombre: "Audífonos DJ", precio: "$50", imagen: "https://via.placeholder.com/200" },
  { nombre: "Consola de DJ", precio: "$300", imagen: "https://via.placeholder.com/200" },
  { nombre: "Ropa Urbana", precio: "$25", imagen: "https://via.placeholder.com/200" },
  { nombre: "Celular", precio: "$400", imagen: "https://via.placeholder.com/200" },
  { nombre: "Computador", precio: "$700", imagen: "https://via.placeholder.com/200" }
];

const listaProductos = document.getElementById("lista-productos");

// Generar productos dinámicamente
productos.forEach(prod => {
  const div = document.createElement("div");
  div.classList.add("producto");
  div.innerHTML = `
    <img src="${prod.imagen}" alt="${prod.nombre}">
    <h3>${prod.nombre}</h3>
    <p>${prod.precio}</p>
  `;
  listaProductos.appendChild(div);
});

// Formulario de contacto
const form = document.getElementById("form-contacto");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert(`Gracias ${document.getElementById("nombre").value}, tu mensaje ha sido enviado!`);
  form.reset();
});
