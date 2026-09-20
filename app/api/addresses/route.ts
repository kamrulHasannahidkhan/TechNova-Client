import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();
  const user = await User.findOne({ email: session.user.email });
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  user.addresses.push(body);
  await user.save();

  return NextResponse.json(user.addresses, { status: 201 });
}
