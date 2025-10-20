import dbConnect from "@/lib/db";
import Product from "@/models/product";
import { NextResponse } from "next/server";

// GET: Fetch all products
export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error("GET /products error:", err);
    return NextResponse.json({ error: "Server error", details: err.message }, { status: 500 });
  }
}

// POST: Add a new product
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { title, slug, description, price, images, category, stock, featured } = body;

    if (!title || !slug || !price)
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

    const newProduct = await Product.create({ title, slug, description, price, images, category, stock, featured });
    return NextResponse.json({ message: "Product added", product: newProduct }, { status: 201 });
  } catch (err) {
    console.error("POST /products error:", err);
    return NextResponse.json({ error: "Server error", details: err.message }, { status: 500 });
  }
}

// PUT: Update a product
export async function PUT(req) {
  try {
    await dbConnect();
    const { id, ...updateFields } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing product ID" }, { status: 400 });

    const updated = await Product.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updated) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json({ message: "Product updated", product: updated }, { status: 200 });
  } catch (err) {
    console.error("PUT /products error:", err);
    return NextResponse.json({ error: "Server error", details: err.message }, { status: 500 });
  }
}

// DELETE: Delete a product
export async function DELETE(req) {
  try {
    await dbConnect();
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing product ID" }, { status: 400 });

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json({ message: "Product deleted", product: deleted }, { status: 200 });
  } catch (err) {
    console.error("DELETE /products error:", err);
    return NextResponse.json({ error: "Server error", details: err.message }, { status: 500 });
  }
}
