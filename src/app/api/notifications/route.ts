import { connect } from "@/dbConfig/dbConfig";
import Notification from "@/models/Notifications";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { message, users } = reqBody;

    const notification = new Notification({
      message: message || "Welcome to EduConnect!",
      users,
    });

    await notification.save();

    return NextResponse.json({ message: "Notifications sent successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const notifications = await Notification.find();
    return NextResponse.json({ notifications }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, read } = await request.json();
    await Notification.findByIdAndUpdate(id, { read });
    return NextResponse.json({ message: "Notification updated successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
