import ProductGrid from "./ProductGrid";
import CategorySidebar from "./CategorySidebar";

export default function Hero() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#10002b] via-[#240046] to-[#3c096c] text-white">
      
      {/* Main Content */}
      <main className="flex-1 mt-3 flex flex-col md:flex-row"> {/* Stack on mobile, row on md+ */}
        
        {/* Sidebar (Categories) */}
        <aside className="md:w-64 w-full px-4 md:px-8">
          <CategorySidebar />
        </aside>

        {/* Right Side: Hero Text + Product Grid */}
        <section className="flex-1 flex flex-col px-4 md:px-16">
          {/* Product Grid */}
          <ProductGrid />
        </section>

      </main>
     
    </div>
  );
}
