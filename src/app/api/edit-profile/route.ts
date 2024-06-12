// /src/pages/api/users/profile.ts
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function GET(request: NextRequest) {
  try {
    const tokenCookie = request.cookies.get("token");

    if (!tokenCookie || !tokenCookie.value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = tokenCookie.value;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
    const user = await User.findById((decoded as any).id).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const tokenCookie = request.cookies.get("token");

    if (!tokenCookie || !tokenCookie.value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = tokenCookie.value;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
    const userId = (decoded as any).id;

    const { username, email, specialization } = await request.json();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, specialization },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
