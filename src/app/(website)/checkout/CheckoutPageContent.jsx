"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useCart } from "@/context/cartcontext";
import Link from "next/link";
import { Plus, Minus, X } from "lucide-react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

export default function CheckoutPageContent() {
  const { cartItems = [], incrementCart, decrementCart, removeFromCart, clearCart } = useCart();
  const [showForm, setShowForm] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  const params = useSearchParams();
  const success = params.get("success");
  const canceled = params.get("canceled");
  const router = useRouter();

  useEffect(() => {
    if (success) {
      setOrderSuccess(true);
      clearCart();
    }
  }, [success]);

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) return;
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.address) return;

    const orderData = {
      customer,
      products: cartItems.map((item) => ({
        productId: item.id,
        title: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || "/placeholder.png",
      })),
      total: totalPrice,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Failed to submit order");
      setOrderSuccess(true);
      setShowForm(false);
      clearCart();
      setCustomer({ name: "", phone: "", address: "" });
      setPhoneError("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }
  };

  const handleStripePayment = async () => {
    if (cartItems.length === 0) return alert("Your cart is empty!");

    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }), // ✅ must match API
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // ✅ redirect to Stripe checkout
      } else {
        alert("Payment initialization failed: " + (data.error || ""));
      }
    } catch (err) {
      console.error(err);
      alert("Payment initialization failed.");
    }
  };

  const getImageSrc = (item) => item.image || "/placeholder.png";

  return (
    <div className="min-h-screen mt-12 pt-8 pb-12 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-white drop-shadow-lg">Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-200 text-lg">
          Your cart is empty.{" "}
          <Link href="/" className="text-yellow-400 underline hover:text-yellow-300">
            Shop Now
          </Link>
        </p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-lg shadow-2xl rounded-xl p-6 flex flex-col gap-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4 border-purple-300"
            >
              <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-purple-400">
                <Image
                  src={getImageSrc(item)}
                  alt={item.name}
                  fill
                  className="object-cover"
                  unoptimized
                  onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                />
              </div>

              <div className="flex-1 ml-4">
                <h2 className="font-semibold text-lg text-purple-900">{item.name}</h2>
                <p className="text-gray-600">Price: {item.price} ৳</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decrementCart(item.id)}
                    className="p-1 bg-purple-200 rounded hover:bg-purple-300 transition"
                  >
                    <Minus className="w-4 h-4 text-purple-700" />
                  </button>
                  <span className="px-2 font-semibold text-purple-900">{item.quantity}</span>
                  <button
                    onClick={() => incrementCart(item.id)}
                    className="p-1 bg-purple-200 rounded hover:bg-purple-300 transition"
                  >
                    <Plus className="w-4 h-4 text-purple-700" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 ml-4 hover:text-red-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}

          <div className="mt-6 flex justify-between items-center">
            <p className="text-2xl font-bold text-purple-900">
              Total: {totalPrice.toFixed(2)} ৳
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleConfirmOrder}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all"
              >
                Confirm Order
              </button>
              <button
                onClick={handleStripePayment}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-gray-800"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 rounded-2xl shadow-2xl p-6 w-11/12 sm:w-96 text-white">
            <h2 className="text-2xl font-bold mb-4 text-center drop-shadow-lg">
              Customer Details
            </h2>

            <div className="max-h-40 overflow-y-auto mb-4 p-2 bg-white/20 rounded-lg">
              <h3 className="font-semibold mb-2 text-yellow-300">Your Selected Products:</h3>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-yellow-400">
                      <Image
                        src={getImageSrc(item)}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                        onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                      />
                    </div>
                    <p className="text-sm">
                      {item.name} x {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">
                    {(item.price * item.quantity).toFixed(2)}৳
                  </p>
                </div>
              ))}
              <p className="text-right font-bold mt-2">Total: {totalPrice.toFixed(2)}৳</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
                required
              />

              <div className="flex flex-col">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={customer.phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setCustomer({ ...customer, phone: value });
                      setPhoneError("");
                    } else {
                      setPhoneError("Please enter numbers only");
                    }
                  }}
                  className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
                  required
                />
                {phoneError && <span className="text-red-500 text-sm mt-1">{phoneError}</span>}
              </div>

              <textarea
                placeholder="Address"
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black resize-none"
                rows={3}
                required
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-pink-500 hover:to-yellow-400 text-white px-4 py-2 rounded-xl font-bold transition-all"
                >
                  Submit Order
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Message */}
      {orderSuccess && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-2xl shadow-2xl p-6 w-11/12 sm:w-96 text-center text-white">
            <h2 className="text-2xl font-bold mb-4 drop-shadow-lg">✅ Order Successful!</h2>
            <p className="mb-6">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            <button
              onClick={() => setOrderSuccess(false)}
              className="bg-white text-green-700 px-6 py-2 rounded-xl font-bold hover:bg-gray-100 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
