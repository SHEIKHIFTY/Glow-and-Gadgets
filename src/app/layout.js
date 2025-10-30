// src/app/layout.js
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { CartProvider } from "@/context/cartcontext";

export const metadata = {
  title: "Glow & Gadgets",
  description: "Discover trending tech and lifestyle gadgets.",
  keywords:
    "Glow, Glow & Gadgets, Gadgets, glow and gadgets, trending products, products, glow products, gadgets products, online products, online order, online payment, glow online, gadgets online, gadgets and glow, gadgets and glow online glow & gadgets",
  authors: [{ name: "Glow & Gadgets" }],
  creator: "Glow & Gadgets",
  language: "en",
  metadataBase: new URL("https://glow-and-gadgets.vercel.app"), // ✅ Add metadataBase
  // Open Graph (Social Media)
  openGraph: {
    title: "Glow & Gadgets | Discover trending tech and lifestyle gadgets.",
    description:
      "Glow and Gadgets is your ultimate online destination for the latest in tech, lifestyle, and innovative gadgets. At Glow and Gadgets, quality meets affordability, ensuring you get cutting-edge technology without breaking the bank. Explore our curated collection, enjoy seamless shopping, and discover gadgets that add a touch of brilliance to your everyday life.",
    siteName: "Glow & Gadgets",
   images: [
  {
    url: "https://glow-and-gadgets.vercel.app/mylogo.jpeg",
    width: 1200,
    height: 630,
    alt: "Glow & Gadgets",
  },
],

    locale: "en_US",
    type: "website",
  },
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Glow & Gadgets | Discover trending tech and lifestyle gadgets.",
    description:
      "Glow and Gadgets is your ultimate online destination for the latest in tech, lifestyle, and innovative gadgets.",
    images: ["/mylogo.jpeg"], // ✅ Same as OG image
  },
  // Additional Meta Tags
  other: {
    language: "English",
    "theme-color": "#007bff",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
