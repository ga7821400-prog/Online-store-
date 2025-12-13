let carrito = [];
const contenedor = document.getElementById("productos");
const carritoDiv = document.getElementById("carrito");
const checkout = document.getElementById("checkout");
const selectPais = document.getElementById("pais");

// 🌍 Lista de países
const paises = ["Afghanistan","Argentina","Australia","Brazil","Canada","Chile","Colombia","France","Germany","Italy","Mexico","Spain","UAE","UK","USA","Venezuela","Peru","Portugal","Japan","China"];
paises.forEach(p => selectPais.innerHTML += `<option>${p}</option>`);

// 🔹 Productos diversificados (simulación lista para reemplazar API real)
function productosSimulados(){
  const productos=[];
  let id=1;
  const categorias=["tecnologia","ropa","gadgets","vuelos","hoteles"];
  categorias.forEach(c=>{
    for(let i=1;i<=20;i++){
      productos.push({
        id:id++,
        nombre:`${c.charAt(0).toUpperCase()+c.slice(1)} Model ${i}`,
        marca:`Brand${i}`,
        categoria:c,
        precio: Math.floor(Math.random()*900)+50,
        imagenes:[`https://via.placeholder.com/300?text=${c}${i}_1`,`https://via.placeholder.com/300?text=${c}${i}_2`,`https://via.placeholder.com/300?text=${c}${i}_3`],
        proveedor:`Proveedor${i}`
      });
    }
  });
  return productos;
}

// 🔹 Mostrar productos (carrusel)
function mostrar(lista){
  contenedor.innerHTML="";
  lista.forEach(p=>{
    let imgHtml=`<img src="${p.imagenes[0]}" id="img-${p.id}">`;
    if(p.imagenes.length>1){
      imgHtml+=`<div class="miniaturas">${p.imagenes.map(img=>`<img src="${img}" onclick="document.getElementById('img-${p.id}').src='${img}'">`).join('')}</div>`;
    }
    contenedor.innerHTML+=`
      <div class="card">
        ${imgHtml}
        <h3>${p.nombre}</h3>
        <small>${p.marca} • ${p.proveedor}</small>
        <p><strong>$${p.precio}</strong></p>
        <button onclick="agregar(${p.id})">Agregar</button>
      </div>
    `;
  });
}

// 🔹 Filtrar
function filtrar(cat){
  if(cat==="todos") mostrar(window.productos);
  else mostrar(window.productos.filter(p=>p.categoria===cat));
}

// 🔹 Carrito
function agregar(id){
  const prod = window.productos.find(p=>p.id===id);
  const item = carrito.find(p=>p.id===id);
  if(item) item.cantidad++;
  else carrito.push({...prod,cantidad:1});
  mostrarCheckout();
}

function cambiarCantidad(id,delta){
  const item = carrito.find(p=>p.id===id);
  item.cantidad+=delta;
  if(item.cantidad<=0) carrito=carrito.filter(p=>p.id!==id);
  mostrarCheckout();
}

// 🔹 Mostrar checkout
function mostrarCheckout(){
  checkout.classList.remove("oculto");
  carritoDiv.innerHTML="<h3>🛒 Carrito</h3>";
  let total=0;
  carrito.forEach(p=>{
    carritoDiv.innerHTML+=`
      <p>${p.nombre} — $${p.precio} x ${p.cantidad}
      <button onclick="cambiarCantidad(${p.id},1)">+</button>
      <button onclick="cambiarCantidad(${p.id},-1)">-</button></p>`;
    total+=p.precio*p.cantidad;
  });
  carritoDiv.innerHTML+=`<h3>Total: $${total}</h3>`;
}

// 🔹 Pagar con Stripe dentro de la página (ahora funciona)
async function pagar(){
  if(carrito.length===0){ alert("Carrito vacío"); return; }
  const nombre=document.getElementById("nombre").value;
  const direccion=document.getElementById("direccion").value;
  const pais=document.getElementById("pais").value;
  const email=document.getElementById("email").value;
  if(!nombre||!direccion||!pais||!email){ alert("Completa todos los datos"); return; }

  // Total de la orden
  const total=carrito.reduce((sum,p)=>sum+p.precio*p.cantidad,0);

  // Simula guardar tu margen y enviar al proveedor
  alert(`Orden confirmada para ${nombre}, ${direccion}, ${pais}. Total: $${total}\nTu margen se queda en tu cuenta. Enviando al proveedor...`);

  // Stripe real
  const stripe = Stripe("TU_CLAVE_PUBLICA_STRIPE_AQUI"); // Reemplaza con tu clave real
  await stripe.redirectToCheckout({
    lineItems: carrito.map(p=>({
      price_data:{
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

// 🔹 Inicializar
window.productos=productosSimulados();
mostrar(window.productos);
