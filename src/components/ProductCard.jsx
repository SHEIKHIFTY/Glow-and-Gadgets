"use client";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const router = useRouter();

  // Use MongoDB fields
  const {
    _id,
    title,
    price,
    discount = 0, // optional discount percentage
    images = [],
    rating = 4,
  } = product;

  const finalPrice = discount > 0 ? price - (price * discount) / 100 : price;

  return (
    <div
      onClick={() => router.push(`/products/${_id}`)}
      className="bg-[#171B5C] rounded-xl overflow-hidden shadow-lg transition-all duration-300 
                 flex flex-col hover:shadow-[0_0_20px_#8A2BE2] hover:scale-95 
                 mb-3 sm:mb-6 cursor-pointer"
    >
      {/* Product Image */}
      <div className="w-full h-36 sm:h-48 md:h-64 flex items-center justify-center bg-white p-2 sm:p-4">
        {images[0] ? (
          <img
            src={images[0]}
            alt={title}
            className="max-h-full max-w-full object-contain transform hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
            No Image
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-2 sm:p-4 flex-1 flex flex-col justify-between text-center sm:text-left">
        <h3 className="text-sm sm:text-lg font-semibold text-white mb-1 sm:mb-2 line-clamp-2">
          {title}
        </h3>

        <p className="text-[#00FFFF] font-bold text-sm sm:text-md mb-1 sm:mb-2">
          {finalPrice}৳{" "}
          {discount > 0 && (
            <span className="text-xs sm:text-sm line-through text-gray-400 ml-1 sm:ml-2">
              {price}৳
            </span>
          )}
        </p>

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            {discount}% Off
          </span>
        )}

        {/* Rating */}
        <div className="flex items-center justify-center sm:justify-start mt-auto">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < rating ? "text-yellow-400" : "text-gray-500"}`}
            />
          ))}
          <span className="text-xs sm:text-sm text-gray-300 ml-1 sm:ml-2">{rating}.0</span>
        </div>
      </div>
    </div>
  );
}
