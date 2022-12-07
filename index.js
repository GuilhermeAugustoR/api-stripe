import express from "express";
const app = express();
app.use(express.json());
const port = 3000; //add your port here
const PUBLISHABLE_KEY = "ADD_PUBLISHABLE KEY HERE";
const SECRET_KEY =
  "sk_test_51LxfY9C7iSI18SQJe3gBLBWKsDzc9Y2CylBAkbK91yybfALIuy5FG65yxJXddAbPVLa2qN8jK2Gb4fhoPBgIDUqe006LOOtJth";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  try {
    const payableAmount = parseInt(amount) * 100;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: payableAmount,
      currency: "brl",
      payment_method_types: ["card"],
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});
