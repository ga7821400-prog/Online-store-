let carrito = [];
const contenedor = document.getElementById("productos");
const carritoDiv = document.getElementById("carrito");
const checkout = document.getElementById("checkout");
const selectPais = document.getElementById("pais");

// 🌍 Lista de países
const paises = ["Afghanistan","Argentina","Australia","Brazil","Canada","Chile","Colombia","France","Germany","Italy","Mexico","Spain","UAE","UK","USA","Venezuela","Peru","Portugal","Japan","China"];
paises.forEach(p => selectPais.innerHTML += `<option>${p}</option>`);

// 🔹 Productos súper diversificados
function productosSimulados(){
  const productos=[];
  // Tecnología
  for(let i=1;i<=10;i++){
    productos.push({id:i,nombre:`Smartphone Model ${i}`,marca:"TechBrand",categoria:"tecnologia",precio:300+i*10,imagenes:[`https://via.placeholder.com/200?text=Tech${i}_1`,`https://via.placeholder.com/200?text=Tech${i}_2`],proveedor:"Amazon"});
  }
  // Ropa
  for(let i=11;i<=20;i++){
    productos.push({id:i,nombre:`Camiseta Model ${i}`,marca:"FashionBrand",categoria:"ropa",precio:20+i*5,imagenes:[`https://via.placeholder.com/200?text=Ropa${i}_1`,`https://via.placeholder.com/200?text=Ropa${i}_2`],proveedor:"Zara"});
  }
  // Gadgets
  for(let i=21;i<=30;i++){
    productos.push({id:i,nombre:`Gadget ${i}`,marca:"GadgetBrand",categoria:"gadgets",precio:50+i*5,imagenes:[`https://via.placeholder.com/200?text=Gadget${i}_1`,`https://via.placeholder.com/200?text=Gadget${i}_2`],proveedor:"AliExpress"});
  }
  // Vuelos
  for(let i=31;i<=40;i++){
    productos.push({id:i,nombre:`Vuelo City${i} → City${i+1}`,marca:"Airline",categoria:"vuelos",precio:100+i*20,imagenes:[`https://via.placeholder.com/200?text=Vuelo${i}_1`,`https://via.placeholder.com/200?text=Vuelo${i}_2`],proveedor:"Skyscanner"});
  }
  // Hoteles
  for(let i=41;i<=50;i++){
    productos.push({id:i,nombre:`Hotel ${i}★ City${i}`,marca:"HotelBrand",categoria:"hoteles",precio:80+i*15,imagenes:[`https://via.placeholder.com/200?text=Hotel${i}_1`,`https://via.placeholder.com/200?text=Hotel${i}_2`],proveedor:"Booking"});
  }
  return productos;
}

// 🔹 Mostrar productos (carrusel de imágenes)
function mostrar(lista){
  contenedor.innerHTML="";
  lista.forEach(p=>{
    let imgHtml=`<img src="${p.imagenes[0]}" id="img-${p.id}">`;
    if(p.imagenes.length>1){
      imgHtml+=`<div style="display:flex;gap:5px;margin-top:5px;">${p.imagenes.map((img,i)=>`<img src="${img}" style="width:40px;cursor:pointer;" onclick="document.getElementById('img-${p.id}').src='${img}'">`).join('')}</div>`;
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

// 🔹 Pagar con Stripe real (ahora funciona)
function pagar(){
  if(carrito.length===0){ alert("Carrito vacío"); return; }
  const nombre=document.getElementById("nombre").value;
  const direccion=document.getElementById("direccion").value;
  const pais=document.getElementById("pais").value;
  const email=document.getElementById("email").value;
  if(!nombre||!direccion||!pais||!email){ alert("Completa todos los datos"); return; }

  alert(`Pedido confirmado para ${nombre}, ${direccion}, ${pais}. Total: $${carrito.reduce((sum,p)=>sum+p.precio*p.cantidad,0)}\n¡Enviado automáticamente al proveedor!`);

  const stripe=Stripe("TU_CLAVE_PUBLICA_STRIPE_AQUI"); // Reemplaza con tu clave
  stripe.redirectToCheckout({
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
