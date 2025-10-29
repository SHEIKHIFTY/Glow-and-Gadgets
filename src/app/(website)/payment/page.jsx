"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/context/cartcontext";

export default function PaymentPage() {
  const { cartItems } = useCart();
  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  const handlePayment = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/create-payment-intent", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ items: cartItems }),
});


      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // redirect to Stripe Checkout
      } else {
        alert("Payment initialization failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to payment gateway.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white p-6">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Payment</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-300">No items in cart.</p>
        ) : (
          <>
            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <p>{item.name} × {item.quantity}</p>
                  <p>{(item.price * item.quantity).toFixed(2)}৳</p>
                </div>
              ))}
            </div>
            <div className="text-xl font-bold text-right mb-6">
              Total: {totalPrice.toFixed(2)}৳
            </div>
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-500 transition-all"
            >
              {loading ? "Processing..." : "Pay with Stripe"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
