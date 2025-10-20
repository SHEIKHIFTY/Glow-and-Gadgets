// src/app/layout.js
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { CartProvider } from "@/context/cartcontext"; // ✅ import CartProvider

export const metadata = {
  title: "Glow & Gadgets",
  description: "Discover trending tech and lifestyle gadgets.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <CartProvider> {/* ✅ Wrap your app in CartProvider */}
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
