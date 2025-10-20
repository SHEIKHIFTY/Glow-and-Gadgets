import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecretkey";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
let ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// Helper to verify token
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

// POST: login
export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password)
      return NextResponse.json({ message: "Missing credentials" }, { status: 400 });

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD)
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const token = jwt.sign({ username }, SECRET, { expiresIn: "12h" });

    const res = NextResponse.json({ message: "Login successful", token });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in prod, false for local
      sameSite: "strict",
      maxAge: 12 * 60 * 60,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// GET: verify login
export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    return NextResponse.json({ message: "Authorized", user: decoded.username });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// DELETE: logout
export async function DELETE(req) {
  try {
    const res = NextResponse.json({ message: "Logged out successfully" });
    res.cookies.set("token", "", { maxAge: 0, path: "/" });
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
