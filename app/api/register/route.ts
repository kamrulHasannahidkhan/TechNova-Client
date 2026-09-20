import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  await connectDB();
  const { name, email, phone, password } = await req.json();

  if (!name || !email || !phone || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ name, email: email.toLowerCase(), phone, passwordHash });

  return NextResponse.json({ success: true }, { status: 201 });
}
