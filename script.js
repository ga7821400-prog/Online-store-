const productos = [
  {
    nombre: "Audífonos Bluetooth",
    precio: 29,
    imagen: "https://via.placeholder.com/300",
  },
  {
    nombre: "Cargador Rápido USB-C",
    precio: 19,
    imagen: "https://via.placeholder.com/300",
  },
  {
    nombre: "Smartwatch Deportivo",
    precio: 49,
    imagen: "https://via.placeholder.com/300",
  },
  {
    nombre: "Repuestos Consolas DJ",
    precio: 99,
    imagen: "https://via.placeholder.com/300",
  }
];

const contenedor = document.getElementById("productos");

productos.forEach(producto => {
  contenedor.innerHTML += `
    <div class="card">
      <img src="${producto.imagen}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button onclick="comprar('${producto.nombre}')">
        Comprar
      </button>
    </div>
  `;
});

function comprar(nombre) {
  const mensaje = `Hola, quiero comprar: ${nombre}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(mensaje)}`);
}
