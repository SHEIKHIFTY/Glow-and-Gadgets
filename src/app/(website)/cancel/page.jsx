"use client";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 p-6">
      <h1 className="text-5xl font-bold text-red-700 mb-6">❌ Payment Canceled</h1>
      <p className="text-lg text-red-800 mb-6">
        You canceled the payment. You can try again anytime.
      </p>
      <Link
        href="/checkout"
        className="bg-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-800 transition"
      >
        Go Back to Checkout
      </Link>
    </div>
  );
}
