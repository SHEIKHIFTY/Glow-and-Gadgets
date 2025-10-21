import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    products: [
      {
        productId: { type: String },
        title: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        image: { type: String },
      },
    ],
    total: { type: Number, required: true },
    status: { type: String, default: "Pending" }, // Pending, Completed, Cancelled
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
