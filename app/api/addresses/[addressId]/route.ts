import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ addressId: string }> }) {
  const { addressId } = await params;
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const user = await User.findOne({ email: session.user.email });
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  user.addresses = user.addresses.filter((a: any) => a._id.toString() !== addressId);
  await user.save();

  return NextResponse.json(user.addresses);
}
