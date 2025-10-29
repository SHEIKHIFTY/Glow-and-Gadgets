"use client";
import { Suspense } from "react";
import CheckoutPageContent from "./CheckoutPageContent";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="text-center mt-16 text-white">Loading checkout...</div>}>
      <CheckoutPageContent />
    </Suspense>
  );
}
