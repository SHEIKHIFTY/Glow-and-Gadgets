import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/product";
import Category from "@/models/category";

export async function GET(req, { params }) {
  await dbConnect();
  const { slug } = params;

  const category = await Category.findOne({ slug });
  if (!category) {
    return NextResponse.json({ message: "Category not found" }, { status: 404 });
  }

  const products = await Product.find({ category: category._id });
  return NextResponse.json(products);
}
