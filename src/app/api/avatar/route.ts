// /src/pages/api/users/update-avatar.ts
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function PUT(request: NextRequest) {
    try {
        const tokenCookie = request.cookies.get("token");

        if (!tokenCookie || !tokenCookie.value) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const token = tokenCookie.value;
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
        const userId = (decoded as any).id;

        const { avatar } = await request.json();

        const user = await User.findByIdAndUpdate(userId, { avatar }, { new: true }).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, user });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
