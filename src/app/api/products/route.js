import dbConnect from "@/lib/db";
import Product from "@/models/product";
import { NextResponse } from "next/server";

// GET /api/products — fetch all products
export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find().populate("category");
    return NextResponse.json(products);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/products — add new product
export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    if (!data.title || !data.slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const product = await Product.create(data);
    return NextResponse.json(product);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
