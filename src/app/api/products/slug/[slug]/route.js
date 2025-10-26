import dbConnect from "@/lib/db";
import Product from "@/models/product";
import { NextResponse } from "next/server";

// GET /api/products/:slug — fetch product by slug
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { slug } = params;

    const product = await Product.findOne({ slug }).populate("category");
    if (!product)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json(product);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
