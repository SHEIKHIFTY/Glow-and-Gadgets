import dbConnect from "@/lib/db";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q || q.trim() === "") {
      return NextResponse.json([]); // don't show all when empty
    }

    // Match only products whose title or description contains the query
    const regex = new RegExp(q, "i");
    const products = await Product.find({
      $or: [{ title: regex }, { description: regex }],
    })
      .limit(10)
      .select("title slug images price"); // only necessary fields

    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Search API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
