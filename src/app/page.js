import CategorySidebar from "@/components/CategorySidebar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";

export default async function HomePage() {
  let products = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`, {
      cache: "no-store", // ensures fresh data every time
    });
    const data = await res.json();
    products = Array.isArray(data) ? data : data?.product ? [data.product] : [];
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }

  return (
    <main className="flex flex-col md:flex-row">
      <CategorySidebar />
      <div className="flex-1">
        <Hero />
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
