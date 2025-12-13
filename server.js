const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// Endpoint para recibir la orden y calcular comisiones
app.post("/order", (req, res) => {
  const { cart, customer } = req.body;

  let total = 0;
  let ordersByProvider = {};

  cart.forEach(item => {
    total += item.price;
    if (!ordersByProvider[item.providerId]) {
      ordersByProvider[item.providerId] = { items: [], total: 0 };
    }
    ordersByProvider[item.providerId].items.push(item);
    ordersByProvider[item.providerId].total += item.price;
  });

  // Comisión del marketplace (10%)
  const commission = total * 0.10;

  console.log("Nueva orden:");
  console.log("Cliente:", customer);
  console.log("Total:", total);
  console.log("Comisión marketplace:", commission);
  console.log("Pagos a proveedores:", ordersByProvider);

  res.json({
    success: true,
    message: "Orden recibida y lista para procesar pagos",
    total,
    commission,
    ordersByProvider
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Marketplace activo en http://localhost:${PORT}`));
