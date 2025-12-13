const products = [
  {id:1,type:"TECH",name:"iPhone 15 Pro",price:1199,img:"https://images.unsplash.com/photo-1685226111426",providerId:"APPLE"},
  {id:2,type:"TECH",name:"MacBook Pro M3",price:2499,img:"https://images.unsplash.com/photo-1517336714731",providerId:"APPLE"},
  {id:3,type:"FASHION",name:"Nike Air Force 1",price:129,img:"https://images.unsplash.com/photo-1600180758895",providerId:"NIKE"},
  {id:4,type:"FASHION",name:"Adidas Jacket",price:99,img:"https://images.unsplash.com/photo-1512436991641",providerId:"ADIDAS"},
  {id:5,type:"FLIGHT",name:"Dubai → Paris (Air France)",price:580,img:"https://images.unsplash.com/photo-1504198453319",providerId:"AIRFRANCE"},
  {id:6,type:"HOTEL",name:"Hilton Paris 5★",price:420,img:"https://images.unsplash.com/photo-1582719478186",providerId:"HILTON"}
];

let cart = [];

const productsContainer = document.getElementById("products");
const cartItems = document.getElementById("cart-items");

function render(list=products){
  productsContainer.innerHTML = list.map((p,i)=>`
    <div class="product">
      <img src="${p.img}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="add(${i})">Agregar</button>
    </div>
  `).join("");
}

function filter(t){
  render(t==="ALL"?products:products.filter(p=>p.type===t));
}

function add(i){
  cart.push(products[i]);
  document.getElementById("cart-count").innerText = cart.length;
}

function toggleCart(){
  document.getElementById("cart").classList.toggle("hidden");
  cartItems.innerHTML = cart.map(p=>`<p>${p.name} - $${p.price}</p>`).join("");
  document.getElementById("total").innerText = cart.reduce((a,b)=>a+b.price,0);
}

async function submitOrder(){
  const customer = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value
  };

  const res = await fetch("/order",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ cart, customer })
  });

  const data = await res.json();
  alert(`Orden generada!\nTotal: $${data.total}\nComisión: $${data.commission}`);
  cart=[];
  toggleCart();
  document.getElementById("cart-count").innerText = 0;
}

render();
