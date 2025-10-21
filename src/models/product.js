import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  price: Number,
  stock: Number,
  featured: { type: Boolean, default: false },
  images: [String],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);
