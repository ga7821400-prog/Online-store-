const productos = [
  {
    id: 1,
    nombre: "iPhone 15 Pro",
    marca: "Apple",
    categoria: "tecnologia",
    precio: 999,
    proveedor: "Amazon"
  },
  {
    id: 2,
    nombre: "Samsung Galaxy S24",
    marca: "Samsung",
    categoria: "tecnologia",
    precio: 899,
    proveedor: "Samsung Store"
  },
  {
    id: 3,
    nombre: "Audífonos AirPods Pro",
    marca: "Apple",
    categoria: "tecnologia",
    precio: 249,
    proveedor: "BestBuy"
  },
  {
    id: 4,
    nombre: "Hoodie Nike",
    marca: "Nike",
    categoria: "ropa",
    precio: 69,
    proveedor: "Nike Store"
  },
  {
    id: 5,
    nombre: "Vuelo Dubái → Madrid",
    marca: "Emirates",
    categoria: "vuelos",
    precio: 650,
    proveedor: "Skyscanner"
  },
  {
    id: 6,
    nombre: "Hotel 5★ en París (3 noches)",
    marca: "Hilton",
    categoria: "hoteles",
    precio: 480,
    proveedor: "Booking"
  }
  const contenedor = document.getElementById("productos");

function mostrar(lista) {
  contenedor.innerHTML = "";
  lista.forEach((p, i) => {
    contenedor.innerHTML += `
      <div class="card">
        <h3>${p.nombre}</h3>
        <p>${p.marca}</p>
        <p>$${p.precio}</p>
        <small>Proveedor: ${p.proveedor}</small>
        <button onclick="agregar(${i})">Agregar</button>
      </div>
    `;
  });
}

function filtrar(categoria) {
  const filtrados = productos.filter(p => p.categoria === categoria);
  mostrar(filtrados);
}

mostrar(productos);
];
