// server.js
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// almacenar órdenes en memoria (temporal) - para producción usar DB
let orders = [];

app.post('/order', (req, res) => {
  try {
    const { cart, customer } = req.body;
    if (!cart || cart.length === 0) return res.status(400).json({ success:false, msg:'Carrito vacío' });

    // calcular totales y agrupar por proveedor
    let total = 0;
    const ordersByProvider = {};
    cart.forEach(item => {
      total += item.price * (item.quantity || 1);
      const pid = item.providerId || 'UNKNOWN_PROVIDER';
      if (!ordersByProvider[pid]) ordersByProvider[pid] = { providerId: pid, items: [], total: 0, providerName: item.providerName || pid };
      ordersByProvider[pid].items.push(item);
      ordersByProvider[pid].total += item.price * (item.quantity || 1);
    });

    const commissionPercent = 0.10; // configurable
    const commission = Number((total * commissionPercent).toFixed(2));

    const orderRecord = {
      id: 'ORD-' + Date.now(),
      createdAt: new Date().toISOString(),
      customer,
      cart,
      total,
      commission,
      byProvider: ordersByProvider,
      status: 'PENDING'
    };

    orders.push(orderRecord);

    console.log('NUEVA ORDEN:', orderRecord.id, 'Total:', total, 'Commission:', commission);
    // Aquí integrarías Stripe Connect / PayPal Commerce para generar pagos split (no implementado en este archivo)
    res.json({ success:true, order: orderRecord });
  } catch (err) {
    console.error('Error /order', err);
    res.status(500).json({ success:false, msg:'Error en servidor' });
  }
});

// simple endpoint para ver orders (debug)
app.get('/orders', (req,res)=> res.json({ success:true, count: orders.length, orders }));

// fallback - servir index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Marketplace corriendo en http://localhost:${PORT}`));
