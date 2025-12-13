async function cargarProductos() {
  try {
    const respuesta = await fetch('https://api-simulada.com/productos'); // reemplaza con la API real
    const data = await respuesta.json();

    // Mapear a nuestro modelo
    const productosAPI = data.map(p => ({
      id: p.id,
      nombre: p.nombre,
      marca: p.marca,
      categoria: p.categoria,
      precio: p.precio,
      imagen: p.imagen,
      proveedor: p.proveedor,
      link: p.link
    }));

    mostrar(productosAPI);
  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}
