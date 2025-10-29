// app/api/create-payment-intent/route.js or pages/api/create-payment-intent.js
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items provided for checkout" },
        { status: 400 }
      );
    }

    // Convert items to Stripe line_items with paisa
    const line_items = items.map((item) => ({
      price_data: {
        currency: "bdt", // Bangladeshi Taka
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Convert BDT to paisa
      },
      quantity: item.quantity,
    }));

    // Calculate total amount in paisa
    const totalAmount = line_items.reduce(
      (sum, item) => sum + item.price_data.unit_amount * item.quantity,
      0
    );

    // Stripe minimum requirement ~63 BDT (0.50 USD)
    const MIN_AMOUNT_Paisa = 6300; 
    if (totalAmount < MIN_AMOUNT_Paisa) {
      return NextResponse.json(
        { error: "Minimum payment amount is 63 BDT" },
        { status: 400 }
      );
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
     success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,

    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe full error:", err);
    return NextResponse.json(
      { error: err.message || "Payment initialization failed" },
      { status: 500 }
    );
  }
}
