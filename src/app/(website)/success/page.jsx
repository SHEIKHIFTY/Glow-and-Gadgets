"use client";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 px-4 sm:px-6 py-10 text-center">
      <h1 className="text-3xl sm:text-5xl font-bold text-green-700 mb-4 sm:mb-6">
        ✅ Payment Successful!
      </h1>

      <p className="text-base sm:text-lg text-green-800 mb-6 max-w-md">
        Thank you for your purchase. Your payment has been successfully processed.
      </p>

      <Link
        href="/"
        className="bg-green-700 text-white px-5 sm:px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition text-sm sm:text-base w-full sm:w-auto"
      >
        Go Back to Shop
      </Link>
    </div>
  );
}
