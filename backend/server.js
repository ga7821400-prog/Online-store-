import express from "express";
import Stripe from "stripe";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

// — AMAZON PRODUCTS SIMULADOS (Reemplazar con API real) —
app.get("/api/products/amazon", async (req, res) => {
  try {
    const { search } = req.query;
    const productos = [];
    for (let i = 1; i <= 20; i++) {
      productos.push({
        id: i,
        title: `${search} Producto Real ${i}`,
        price: Math.floor(Math.random() * 900) + 50,
        image: `https://via.placeholder.com/300?text=${search}+${i}`,
        url: `https://www.amazon.com/dp/mock${i}`
      });
    }
    res.json(productos);
  } catch (e) {
    console.error("Amazon API Error:", e);
    res.status(500).json({ error: "Amazon API failed" });
  }
});

// — SKYSCANNER VUELOS SIMULADOS (Reemplazar con API real) —
app.get("/api/flights", async (req, res) => {
  const { origin, destination, date } = req.query;
  try {
    const flights = [];
    for (let i = 1; i <= 5; i++) {
      flights.push({
        flight: `${origin} → ${destination}`,
        date,
        price: Math.floor(Math.random() * 500) + 50,
        airline: `Airline ${i}`
      });
    }
    res.json(flights);
  } catch (e) {
    console.error("Skyscanner Error:", e);
    res.status(500).json({ error: "Skyscanner API failed" });
  }
});

// — STRIPE CHECKOUT —
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map(p => ({
        price_data: {
          currency: "usd",
          product_data: { name: p.title },
          unit_amount: Math.round(p.price * 100),
        },
        quantity: p.quantity,
      })),
      mode: "payment",
      success_url: `${req.headers.origin}?success=true`,
      cancel_url: `${req.headers.origin}?canceled=true`
    });
    res.json({ url: session.url });
  } catch (e) {
    console.error("Stripe Error:", e);
    res.status(500).json({ error: "Stripe session failed" });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Backend corriendo en http://localhost:${PORT}`));
