// script.js

/* ------------- CONFIG ------------- */
// Tamaño del catálogo: ajusta aquí (ej. 300, 800, 1500). Ten en cuenta que muchos items afectan rendimiento.
const TARGET_CATALOG_SIZE = 1000; // opción 2 -> grande

// Comisión marketplace
const COMMISSION_PERCENT = 0.10;

/* ------------- Datos base reales/representativos ------------- */
const TECH_BRANDS = ["Apple","Samsung","Sony","DJI","Dell","HP","Lenovo","ASUS","Microsoft","Xiaomi","OnePlus","Google","Bose","Sennheiser","JBL"];
const TECH_MODELS = {
  "Apple":["iPhone 15 Pro","MacBook Pro 16","iPad Pro","AirPods Pro","Apple Watch Ultra"],
  "Samsung":["Galaxy S23","Galaxy Tab S9","Galaxy Buds","Samsung TV 4K"],
  "Sony":["WH-1000XM5","PlayStation 5","Alpha A7 IV","Sony TV OLED"],
  "DJI":["Mavic Air 2","DJI Mini 3 Pro"],
  "Dell":["XPS 13","Alienware M15"],
  "HP":["Spectre x360","Omen 16"],
  "Lenovo":["ThinkPad X1","Legion 5"],
  "ASUS":["ROG Zephyrus","ZenBook"],
  "Microsoft":["Surface Pro 9","Surface Laptop"],
  "Xiaomi":["Redmi Note 12","Xiaomi Pad"],
  "OnePlus":["OnePlus 11","OnePlus Buds"],
  "Google":["Pixel 8","Pixel Buds"],
  "Bose":["QuietComfort 45"],
  "Sennheiser":["Momentum 4"],
  "JBL":["Charge 5"]
};

const ACCESSORY_TYPES = ["Cargador","Cable USB-C","Funda","Powerbank","Soporte","Teclado","Mouse","Monitor","Protector de pantalla","Adaptador HDMI"];

const FASHION_BRANDS = ["Nike","Adidas","Zara","H&M","Uniqlo","Gucci","Prada","Louis Vuitton","Puma","Reebok","Levi's","The North Face","Patagonia","Supreme","Balenciaga"];
const FASHION_CATEGORIES = ["Camiseta","Chaqueta","Buzo","Jeans","Pantalón","Zapatos","Tenis","Reloj","Bolso","Gafas","Sombrero"];

const CONTINENTS = {
  "AF":["Cairo","Cape Town","Nairobi","Marrakesh","Accra"],
  "AS":["Dubai","Tokyo","Bangkok","Singapore","Seoul","Mumbai","Beijing","Hong Kong"],
  "EU":["London","Paris","Berlin","Madrid","Rome","Amsterdam","Lisbon","Athens"],
  "NA":["New York","Los Angeles","Toronto","Mexico City","Chicago","Miami","Vancouver"],
  "SA":["Sao Paulo","Buenos Aires","Lima","Bogota","Santiago","Quito"],
  "OC":["Sydney","Melbourne","Auckland","Fiji"],
  "AN":["Antarctica Station"]
};

const AIRLINES = ["Emirates","Qatar Airways","British Airways","Air France","Lufthansa","Delta","American Airlines","United","ANA","JAL","Qantas","LATAM","Iberia","KLM","Turkish Airlines"];

const HOTELS_BRANDS = ["Hilton","Marriott","IHG","Accor","Hyatt","Four Seasons","Ritz-Carlton","Hostelworld","BudgetStay","Local Guesthouse"];

const VOLUNTEER_PROJECTS = [
  {name:"Conservación de Tortugas - Costa Rica", price:350},
  {name:"Construcción escolar - Perú", price:280},
  {name:"Voluntariado médico - Kenia", price:420},
  {name:"Protección de parques - Australia", price:390}
];

/* ------------- Utilidades ------------- */
function randInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function pick(arr){ return arr[randInt(0,arr.length-1)]; }

// imagenes: usamos Unsplash "random" by query to get varied photos
function imageFor(){
  return "./images/products/laptop.webp";
}

}

/* ------------- Generador de catálogo ------------- */
function generateCatalog(targetSize){
  const catalog = [];
  let id = 1;

  // Add structured tech items
  TECH_BRANDS.forEach(brand=>{
    const models = TECH_MODELS[brand] || [];
    models.forEach(m=>{
      catalog.push({
        id: id++,
        category: 'TECH',
        subcategory: brand,
        name: `${brand} ${m}`,
        price: Number((randInt(50, 3000) + (brand === 'Apple' ? 200 : 0)).toFixed(2)),
        currency: 'USD',
        providerId: `prov_${brand.toLowerCase()}`,
        providerName: `${brand} Official Store`,
        img: imageFor(`${brand} ${m} product`)
      });
    });
  });

  // Add accessory variations for brands
  ACCESSORY_TYPES.forEach(type=>{
    TECH_BRANDS.forEach(brand=>{
      catalog.push({
        id: id++,
        category: 'ACCESSORY',
        subcategory: type,
        name: `${brand} ${type}`,
        price: Number((randInt(10, 120)).toFixed(2)),
        currency: 'USD',
        providerId: `prov_${brand.toLowerCase()}`,
        providerName: `${brand} Accessories`,
        img: imageFor(`${brand} ${type}`)
      });
    });
  });

  // Add fashion items
  FASHION_BRANDS.forEach(brand=>{
    FASHION_CATEGORIES.forEach(cat=>{
      catalog.push({
        id: id++,
        category: 'FASHION',
        subcategory: cat,
        name: `${brand} ${cat}`,
        price: Number((randInt(15, 600)).toFixed(2)),
        currency: 'USD',
        providerId: `prov_${brand.toLowerCase().replace(/\s+/g,'')}`,
        providerName: `${brand} Official`,
        img: imageFor(`${brand} ${cat}`)
      });
    });
  });

  // Flights: generate many origin-destination pairs across continents
  const cities = [];
  Object.keys(CONTINENTS).forEach(c=>{
    CONTINENTS[c].forEach(city => cities.push({city, continent:c}));
  });

  // create flight combos
  for (let i=0;i<cities.length;i++){
    for (let j=0;j<cities.length;j++){
      if (i===j) continue;
      const origin = cities[i].city;
      const dest = cities[j].city;
      const airline = pick(AIRLINES);
      const price = Math.round(randInt(80, 1800) + (airline === 'Emirates' ? 120 : 0));
      catalog.push({
        id: id++,
        category: 'FLIGHT',
        subcategory: airline,
        name: `${origin} → ${dest} (${airline})`,
        price,
        currency:'USD',
        providerId: `prov_air_${airline.toLowerCase().replace(/\s+/g,'')}`,
        providerName: airline,
        origin,
        destination: dest,
        img: imageFor(`${airline} airplane ${origin} ${dest}`)
      });
      if (catalog.length >= targetSize*0.5) break;
    }
    if (catalog.length >= targetSize*0.5) break;
  }

  // Hotels & hostels
  Object.keys(CONTINENTS).forEach(cont=>{
    CONTINENTS[cont].forEach(city=>{
      // Add several hotels per city
      for (let k=0;k<3;k++){
        const brand = pick(HOTELS_BRANDS);
        const stars = [2,3,4,5][randInt(0,3)];
        const price = Math.round(randInt(20, 600) + stars*20);
        catalog.push({
          id: id++,
          category: 'HOTEL',
          subcategory: brand,
          name: `${brand} ${city} ${stars}★`,
          price,
          currency:'USD',
          providerId: `prov_hotel_${brand.toLowerCase().replace(/\s+/g,'')}`,
          providerName: brand,
          city,
          stars,
          img: imageFor(`${brand} hotel ${city}`)
        });
      }
    });
  });

  // Volunteering options
  VOLUNTEER_PROJECTS.forEach(v=>{
    catalog.push({
      id: id++,
      category: 'VOLUNTEER',
      subcategory: 'Volunteer Project',
      name: v.name,
      price: v.price,
      currency:'USD',
      providerId: `prov_vol_${v.name.toLowerCase().replace(/\s+/g,'_')}`,
      providerName: 'Volunteer Org',
      img: imageFor(`volunteer ${v.name}`)
    });
  });

  // Fill remaining slots with mixed items (accessories, fashion combos) until targetSize
  const poolBrands = TECH_BRANDS.concat(FASHION_BRANDS);
  const poolCats = ['TECH','ACCESSORY','FASHION'];
  while (catalog.length < targetSize) {
    const cat = pick(poolCats);
    const brand = pick(poolBrands);
    let name = `${brand} Item ${catalog.length}`;
    let price = randInt(10,900);
    if (cat === 'TECH') {
      name = `${brand} ${pick(['Gadget','Model','Pro','Max','X'])}`;
      price = randInt(80,2000);
    } else if (cat === 'ACCESSORY') {
      name = `${brand} ${pick(ACCESSORY_TYPES)}`;
      price = randInt(8,150);
    } else {
      name = `${brand} ${pick(FASHION_CATEGORIES)}`;
      price = randInt(12,700);
    }
    catalog.push({
      id: id++,
      category: cat,
      subcategory: brand,
      name,
      price,
      currency: 'USD',
      providerId: `prov_${brand.toLowerCase().replace(/\s+/g,'')}`,
      providerName: `${brand} Official`,
      img: imageFor(`${brand} ${name}`)
    });
  }

  return catalog;
}

/* ------------- App state ------------- */
let CATALOG = generateCatalog(TARGET_CATALOG_SIZE);
let VIEW = { page:1, perPage:20, filtered: CATALOG.slice(), query: '', category:'ALL', continent:'ALL', sort:'relevance' };
let CART = [];

/* ------------- Rendering & UI ------------- */
const productsGrid = document.getElementById('productsGrid');
const cartCount = document.getElementById('cartCount');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const leftPanel = document.getElementById('leftPanel');
const paginationEl = document.getElementById('pagination');

function formatPrice(v){ return Number(v).toFixed(2); }

function applyFilters(){
  let arr = CATALOG.slice();
  // category filter
  if (VIEW.category !== 'ALL') arr = arr.filter(i => i.category === VIEW.category);
  // continent filter (applied to flights/hotels by city continent)
  if (VIEW.continent !== 'ALL') {
    const cities = CONTINENTS[VIEW.continent] || [];
    arr = arr.filter(i => {
      if (i.category === 'FLIGHT') return cities.includes(i.origin) || cities.includes(i.destination);
      if (i.category === 'HOTEL') return cities.includes(i.city);
      return true;
    });
  }
  // search query
  if (VIEW.query && VIEW.query.trim() !== '') {
    const q = VIEW.query.trim().toLowerCase();
    arr = arr.filter(i => (i.name && i.name.toLowerCase().includes(q)) || (i.subcategory && i.subcategory.toLowerCase().includes(q)) || (i.providerName && i.providerName.toLowerCase().includes(q)));
  }
  // sorting
  if (VIEW.sort === 'priceAsc') arr.sort((a,b)=>a.price-b.price);
  if (VIEW.sort === 'priceDesc') arr.sort((a,b)=>b.price-a.price);
  // pagination slice
  VIEW.filtered = arr;
  renderPage();
}

function renderPage(){
  const start = (VIEW.page-1)*VIEW.perPage;
  const pageItems = VIEW.filtered.slice(start, start + VIEW.perPage);
  productsGrid.innerHTML = pageItems.map(p => productCardHTML(p)).join('');
  renderPagination();
}

function productCardHTML(p){
  return `
    <article class="card">
      <img src="${p.img}" alt="${escapeHtml(p.name)}" loading="lazy" />
      <div class="body">
        <h4>${escapeHtml(p.name)}</h4>
        <p class="small">${escapeHtml(p.providerName)} • ${p.subcategory || ''}</p>
        <div class="price">$${formatPrice(p.price)}</div>
        <div class="actions">
          <button class="btnPrimary" onclick="openProduct(${p.id})">Ver</button>
          <button class="btnGhost" onclick="addToCart(${p.id})">Agregar</button>
        </div>
      </div>
    </article>
  `;
}

function renderPagination(){
  const totalPages = Math.max(1, Math.ceil(VIEW.filtered.length / VIEW.perPage));
  let html = '';
  // show minimal pagination
  const showPages = 7;
  const start = Math.max(1, VIEW.page - Math.floor(showPages/2));
  const end = Math.min(totalPages, start + showPages -1);
  if (VIEW.page > 1) html += `<button onclick="goPage(1)">«</button><button onclick="goPage(${VIEW.page-1})">‹</button>`;
  for (let i=start;i<=end;i++){
    html += `<button class="${i===VIEW.page? 'active': ''}" onclick="goPage(${i})">${i}</button>`;
  }
  if (VIEW.page < totalPages) html += `<button onclick="goPage(${VIEW.page+1})">›</button><button onclick="goPage(${totalPages})">»</button>`;
  paginationEl.innerHTML = html;
}

function goPage(n){ VIEW.page = n; renderPage(); }

/* ------------- Cart ------------- */
function addToCart(id){
  const item = CATALOG.find(i=>i.id === id);
  if(!item) return;
  // push a copy with quantity
  const existing = CART.find(x=>x.id===id);
  if(existing) existing.quantity = (existing.quantity||1) + 1;
  else CART.push({...item, quantity:1});
  updateCartUI();
}

function removeFromCart(id){
  CART = CART.filter(i=>i.id !== id);
  updateCartUI();
}

function qtyChange(id, delta){
  const it = CART.find(i=>i.id===id);
  if(!it) return;
  it.quantity = Math.max(1, (it.quantity||1) + delta);
  updateCartUI();
}

function updateCartUI(){
  cartCount.innerText = CART.reduce((s,i)=>s + (i.quantity||1), 0);
  cartItemsEl.innerHTML = CART.map(i=>`
    <div class="cartRow">
      <div><strong>${escapeHtml(i.name)}</strong> <div class="small">${i.providerName}</div></div>
      <div>
        <div>$${formatPrice(i.price)} x ${i.quantity||1} = $${formatPrice(i.price*(i.quantity||1))}</div>
        <div style="margin-top:6px">
          <button onclick="qtyChange(${i.id}, -1)">-</button>
          <button onclick="qtyChange(${i.id}, 1)">+</button>
          <button onclick="removeFromCart(${i.id})">Eliminar</button>
        </div>
      </div>
    </div>
  `).join('') || '<div class="small">Carrito vacío</div>';
  cartTotalEl.innerText = formatPrice(CART.reduce((s,i)=>s + i.price*(i.quantity||1), 0));
}

/* ------------- Product modal & search suggestions ------------- */
const productModal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');
function openProduct(id){
  const p = CATALOG.find(x=>x.id===id);
  if(!p) return;
  modalBody.innerHTML = `
    <div class="prodDetail">
      <img src="${p.img}" alt="${escapeHtml(p.name)}"/>
      <div class="prodInfo">
        <h2>${escapeHtml(p.name)}</h2>
        <div class="meta">${escapeHtml(p.providerName)} • ${p.subcategory || ''}</div>
        <div class="small">Categoría: ${p.category}</div>
        <p>${p.category==='FLIGHT' ? '<strong>Origen:</strong> '+p.origin+' • <strong>Destino:</strong> '+p.destination : ''}</p>
        <p style="margin-top:12px;"><strong>Precio:</strong> $${formatPrice(p.price)}</p>
        <p style="margin-top:12px">${p.description || ''}</p>
        <div style="margin-top:16px">
          <button class="btnPrimary" onclick="addToCart(${p.id}); closeModal()">Agregar al carrito</button>
          <button class="btnGhost" onclick="closeModal()">Cerrar</button>
        </div>
      </div>
    </div>
  `;
  productModal.classList.remove('hidden');
  document.querySelectorAll('.closeModal').forEach(b=>b.onclick = closeModal);
}
function closeModal(){ productModal.classList.add('hidden'); productModal.querySelector('#modalBody').innerHTML=''; }

// search suggestions (basic)
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', ()=>{ performSearch(searchInput.value); });
searchInput.addEventListener('keyup', (e)=>{
  if(e.key === 'Enter') performSearch(searchInput.value);
  // suggestion logic: show top 6 matches in dropdown (simple)
  const q = searchInput.value.trim().toLowerCase();
  if(!q){ closeSuggestion(); return; }
  const matches = CATALOG.filter(i => (i.name && i.name.toLowerCase().includes(q)) || (i.providerName && i.providerName.toLowerCase().includes(q))).slice(0,6);
  showSuggestion(matches);
});

let suggestionBox = null;
function showSuggestion(items){
  closeSuggestion();
  suggestionBox = document.createElement('div');
  suggestionBox.className = 'suggestBox';
  suggestionBox.style.position='absolute';
  suggestionBox.style.background='#fff';
  suggestionBox.style.boxShadow='0 6px 18px rgba(0,0,0,0.12)';
  suggestionBox.style.padding='8px';
  suggestionBox.style.borderRadius='8px';
  suggestionBox.style.top = (document.querySelector('.topbar').offsetHeight + 12) + 'px';
  suggestionBox.style.right = '18px';
  suggestionBox.style.width = '320px';
  suggestionBox.innerHTML = items.map(i=>`<div class="small" style="padding:6px;cursor:pointer" onclick="suggestClick(${i.id})">${i.name} <span class="small" style="color:#888">• ${i.providerName}</span></div>`).join('');
  document.body.appendChild(suggestionBox);
}
function closeSuggestion(){ if(suggestionBox){ suggestionBox.remove(); suggestionBox=null; } }
function suggestClick(id){ closeSuggestion(); openProduct(id); }

function performSearch(q){
  VIEW.query = q || '';
  VIEW.page = 1;
  applyFilters();
  // suggestions: show related destinations/providers for upsell
  const queryLower = (q||'').toLowerCase();
  const relatedProviders = VIEW.filtered.slice(0,8).map(i => i.providerName).filter((v,i,a)=>a.indexOf(v)===i);
  // show small console suggestion (UI could be improved)
  if (relatedProviders.length>0){
    console.info('Sugerencias basadas en la búsqueda:', relatedProviders.slice(0,6));
  }
}

/* ------------- Checkout ------------- */
const checkoutModal = document.getElementById('checkoutModal');
const checkoutForm = document.getElementById('checkoutForm');
const checkoutCommission = document.getElementById('checkoutCommission');
const checkoutTotal = document.getElementById('checkoutTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

document.getElementById('cartToggle').addEventListener('click', ()=>{
  leftPanel.classList.toggle('hidden');
});

checkoutBtn.addEventListener('click', ()=>{
  if(CART.length === 0 && CART.length === 0) {
    // If CART on leftPanel is separate, treat CART as CART variable
  }
  openCheckout();
});

function openCheckout(){
  // calculate totals
  const total = CART.reduce((s,i)=>s + i.price*(i.quantity||1), 0);
  const commission = Number((total * COMMISSION_PERCENT).toFixed(2));
  checkoutCommission.innerText = formatPrice(commission);
  checkoutTotal.innerText = formatPrice(total);
  checkoutModal.classList.remove('hidden');
}
 checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert("✅ Orden generada correctamente (simulado).\nRedirigiendo al pago…");
  window.location.href = "https://buy.stripe.com/TU_LINK_REAL";
});
  const customer = {
    name: document.getElementById('custName').value,
    email: document.getElementById('custEmail').value,
    phone: document.getElementById('custPhone').value,
    address: document.getElementById('custAddress').value,
    notes: document.getElementById('custNotes').value
  };
  if (!customer.name || !customer.email) { alert('Por favor completa nombre y email'); return; }
  // prepare cart payload
  const payloadCart = CART.map(i => ({ id:i.id, name:i.name, price:i.price, quantity:i.quantity||1, providerId:i.providerId, providerName:i.providerName, category:i.category }));
  // send to server
  try{
    const resp = await {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ cart: payloadCart, customer })
    });
    const data = await resp.json();
    if (data && data.success){
      alert('Orden generada correctamente. ID: ' + data.order.id + '\nSe ha calculado la comisión y pago por proveedor.\nRevisa consola / endpoint /orders para más info.');
      // limpiar carrito
      CART = [];
      updateCartUI();
      checkoutModal.classList.add('hidden');
      leftPanel.classList.add('hidden');
    } else {
      alert('Error al generar la orden');
    }
  }catch(err){
    console.error(err);
    alert('Error conectando con el servidor');
  }
});

/* ------------- Helpers & init ------------- */
function escapeHtml(s){ if(!s) return ''; return s.replaceAll && s.replaceAll('<','&lt;').replaceAll('>','&gt;') || s; }
function closeAllModals(){ document.querySelectorAll('.modal').forEach(m=>m.classList.add('hidden')); }

document.querySelectorAll('.closeModal').forEach(b=>b.addEventListener('click', closeAllModals));
document.getElementById('categoryFilter').addEventListener('change', (e)=>{ VIEW.category = e.target.value; VIEW.page = 1; applyFilters(); });
document.getElementById('continentFilter').addEventListener('change', (e)=>{ VIEW.continent = e.target.value; VIEW.page = 1; applyFilters(); });
document.getElementById('sortBy').addEventListener('change', (e)=>{ VIEW.sort = e.target.value; applyFilters(); });

/* initialize cart UI variables used earlier */
function updateCartUI(){
  // similar to earlier but ensure leftPanel DOM updated
  cartCount.innerText = CART.reduce((s,i)=>s + (i.quantity||1), 0);
  cartItemsEl.innerHTML = CART.map(i=>`
    <div style="border-bottom:1px dashed #eee; padding:8px 0">
      <div><strong>${escapeHtml(i.name)}</strong></div>
      <div class="small">${escapeHtml(i.providerName)}</div>
      <div>$${formatPrice(i.price)} x ${i.quantity||1} = $${formatPrice(i.price*(i.quantity||1))}</div>
      <div style="margin-top:6px">
        <button onclick="qtyChange(${i.id}, -1)">-</button>
        <button onclick="qtyChange(${i.id}, 1)">+</button>
        <button onclick="removeFromCart(${i.id})">Eliminar</button>
      </div>
    </div>
  `).join('') || '<div class="small">Carrito vacío</div>';
  cartTotalEl.innerText = formatPrice(CART.reduce((s,i)=>s + i.price*(i.quantity||1), 0));
}

// alias functions used on buttons in product cards
function qtyChange(id, delta){ const it=CART.find(x=>x.id===id); if(!it) return; it.quantity = Math.max(1,(it.quantity||1)+delta); updateCartUI(); }
function removeFromCart(id){ CART = CART.filter(i=>i.id!==id); updateCartUI(); }

// initial render
applyFilters();
updateCartUI();
{
  const response = await fetch("http://localhost:4242/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price })
  });

  const data = await response.json();
  window.location.href = data.url;
  const products = [
  {
    id: 1,
    name: "Laptop Gamer",
    price: 900,
    image: "images/products/laptop.webp"
  },
  {
    id: 2,
    name: "Smartphone",
    price: 500,
    image: "images/products/phone.webp"
  }
];
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const summary = document.getElementById("checkout-summary");

let total = 0;
cart.forEach(item => {
  total += item.price;
  summary.innerHTML += `<p>${item.name} - $${item.price}</p>`;
});

summary.innerHTML += `<h3>Total: $${total}</h3>`;

function payWithStripe() {
  window.location.href = "https://buy.stripe.com/TU_LINK_DE_STRIPE";
}

}
