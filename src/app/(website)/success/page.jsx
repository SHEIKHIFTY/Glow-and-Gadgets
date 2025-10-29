"use client";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-6">
      <h1 className="text-5xl font-bold text-green-700 mb-6">✅ Payment Successful!</h1>
      <p className="text-lg text-green-800 mb-6">
        Thank you for your purchase. Your payment has been successfully processed.
      </p>
      <Link
        href="/"
        className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
      >
        Go Back to Shop
      </Link>
    </div>
  );
}
