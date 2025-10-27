import dbConnect from "@/lib/db";
import Product from "@/models/product";
import { NextResponse } from "next/server";

// GET /api/products/:id
export async function GET(req, context) {
  try {
    await dbConnect();

    
    const { params } = await context;
    const id = params.id;

    const product = await Product.findById(id).populate("category");
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json(product);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT /api/products/:id
export async function PUT(req, context) {
  try {
    await dbConnect();
    const { params } = await context;
    const id = params.id;

    const data = await req.json();
    if (data.images && typeof data.images === "string") {
      data.images = data.images.split(",").map((i) => i.trim());
    }

    const updated = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!updated) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/products/:id
export async function DELETE(req, context) {
  try {
    await dbConnect();
    const { params } = await context;
    const id = params.id;

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
