const productos = [
  { nombre: "Audífonos DJ", precio: "$50", imagen: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?crop=entropy&cs=tinysrgb&fit=max&h=180&w=220" },
  { nombre: "Consola de DJ", precio: "$300", imagen: "https://images.unsplash.com/photo-1589382949034-409c0c6d01b6?crop=entropy&cs=tinysrgb&fit=max&h=180&w=220" },
  { nombre: "Ropa Urbana", precio: "$25", imagen: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?crop=entropy&cs=tinysrgb&fit=max&h=180&w=220" },
  { nombre: "Celular", precio: "$400", imagen: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?crop=entropy&cs=tinysrgb&fit=max&h=180&w=220" },
  { nombre: "Computador Portátil", precio: "$700", imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&h=180&w=220" },
  { nombre: "Audífonos Inalámbricos", precio: "$80", imagen: "https://images.unsplash.com/photo-1580894894512-80e86d0f2d5d?crop=entropy&cs=tinysrgb&fit=max&h=180&w=220" }
];

const lista = document.getElementById("lista-productos");

productos.forEach(p => {
  const div = document.createElement("div");
  div.className = "producto";
  div.innerHTML = `
    <img src="${p.imagen}" alt="${p.nombre}">
    <h3>${p.nombre}</h3>
    <p>${p.precio}</p>
  `;
  lista.appendChild(div);
});

// Formulario de contacto
const form = document.getElementById("form-contacto");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert(`Gracias ${document.getElementById("nombre").value}, tu mensaje ha sido enviado!`);
  form.reset();
});
