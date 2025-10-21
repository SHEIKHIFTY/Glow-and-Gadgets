// src/app/api/categories/route.js
import dbConnect from "@/lib/db";
import Category from "@/models/category";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find({}).sort({ name: 1 });
    return NextResponse.json(categories);
  } catch (err) {
    console.error("GET /api/categories error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    if (!body.name) return NextResponse.json({ error: "Name required" }, { status: 400 });

    // create slug if not provided
    const slug = body.slug && body.slug.trim() ? body.slug.trim() : (body.name || "").toLowerCase().replace(/\s+/g, "-");
    const cat = await Category.create({ name: body.name.trim(), slug });
    return NextResponse.json(cat, { status: 201 });
  } catch (err) {
    console.error("POST /api/categories error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, name, slug } = body;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const update = {};
    if (name) update.name = name.trim();
    if (slug) update.slug = slug.trim();

    const updated = await Category.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /api/categories error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    // Accept id as query param or body
    const url = new URL(req.url);
    const id = url.searchParams.get("id") || (await req.json()).id;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted", category: deleted });
  } catch (err) {
    console.error("DELETE /api/categories error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
