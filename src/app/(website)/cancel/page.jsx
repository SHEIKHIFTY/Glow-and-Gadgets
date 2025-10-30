"use client";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 px-4 sm:px-6 py-10 text-center">
      <h1 className="text-3xl sm:text-5xl font-bold text-red-700 mb-4 sm:mb-6">
        ❌ Payment Canceled
      </h1>

      <p className="text-base sm:text-lg text-red-800 mb-6 max-w-md">
        You canceled the payment. You can try again anytime.
      </p>

      <Link
        href="/checkout"
        className="bg-red-700 text-white px-5 sm:px-6 py-3 rounded-lg font-semibold hover:bg-red-800 transition text-sm sm:text-base w-full sm:w-auto"
      >
        Go Back to Checkout
      </Link>
    </div>
  );
}
