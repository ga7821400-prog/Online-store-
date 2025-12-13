const productos = [
  { nombre: "Audífonos DJ", precio: "$50" },
  { nombre: "Consola de DJ", precio: "$300" },
  { nombre: "Ropa Urbana", precio: "$25" }
];

const lista = document.getElementById("lista-productos");
productos.forEach(p => {
  const div = document.createElement("div");
  div.className = "producto";
  div.innerHTML = `<h3>${p.nombre}</h3><p>${p.precio}</p>`;
  lista.appendChild(div);
});
