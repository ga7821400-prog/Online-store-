let carrito = [];
const selectPais = document.getElementById("pais");
["Argentina","USA","Mexico","Spain","UAE"].forEach(p => selectPais.innerHTML += `<option>${p}</option>`);

// Cargar productos reales de Amazon (simulado)
async function cargarProductos(categoria){
  document.getElementById("flights-section").classList.add("oculto");
  document.getElementById("checkout").classList.add("oculto");
  const url=`http://localhost:4242/api/products/amazon?search=${categoria}`;
  const res=await fetch(url);
  const productos=await res.json();
  const contenedor=document.getElementById("productos");
  contenedor.innerHTML="";
  productos.forEach(p=>{
    contenedor.innerHTML+=`
      <div class="card">
        <img src="${p.image}" onclick="mostrarZoom('${p.image}')">
        <h3>${p.title}</h3>
        <p>$${p.price}</p>
        <button onclick="agregar('${p.id}','${p.title}',${p.price})">Agregar</button>
      </div>
    `;
  });
}

// Lightbox zoom
function mostrarZoom(url){
  document.getElementById("lightbox-img").src=url;
  document.getElementById("lightbox").classList.remove("oculto");
}
function cerrarLightbox(){ document.getElementById("lightbox").classList.add("oculto"); }

// Carrito
function agregar(id,title,price){
  const item=carrito.find(p=>p.id===id);
  if(item) item.quantity++;
  else carrito.push({id,title,price,quantity:1});
  mostrarCheckout();
}
function mostrarCheckout(){
  document.getElementById("checkout").classList.remove("oculto");
  let html="";
  carrito.forEach(p => html+=`<p>${p.title} x ${p.quantity} — $${p.price*p.quantity}</p>`);
  document.getElementById("carrito").innerHTML=html;
}

// Stripe checkout
async function crearStripeSession(){
  const nombre=document.getElementById("nombre").value;
  const direccion=document.getElementById("direccion").value;
  const pais=document.getElementById("pais").value;
  const email=document.getElementById("email").value;
  if(!nombre||!direccion||!pais||!email){ alert("Completa todos los datos"); return; }

  const res=await fetch("http://localhost:4242/api/create-checkout-session",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({items:carrito})
  });
  const data=await res.json();
  window.location = data.url;
}

// Vuelos
function mostrarFlightsForm(){
  document.getElementById("productos").innerHTML="";
  document.getElementById("flights-section").classList.remove("oculto");
}

async function buscarVuelos(){
  const origin=document.getElementById("origin").value;
  const destination=document.getElementById("destination").value;
  const date=document.getElementById("date").value;
  const url=`http://localhost:4242/api/flights?origin=${origin}&destination=${destination}&date=${date}`;
  const res=await fetch(url);
  const data=await res.json();
  document.getElementById("flights-results").innerHTML=JSON.stringify(data, null, 2);
}
