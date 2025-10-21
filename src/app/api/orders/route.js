import dbConnect from "@/lib/db";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const data = await req.json();
    const order = new Order(data);
    await order.save();
    return NextResponse.json({ message: "Order created successfully", order });
  } catch (err) {
    console.error("Order creation error:", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function PATCH(req) {
  await dbConnect();
  try {
    const { id, status } = await req.json();
    if (!id || !status) return NextResponse.json({ error: "Missing id or status" }, { status: 400 });

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json(order);
  } catch (err) {
    console.error("Update order error:", err);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

export async function DELETE(req) {
  await dbConnect();
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await Order.findByIdAndDelete(id);
    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("Delete order error:", err);
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
