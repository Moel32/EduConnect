import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

// Establish database connection
connect();

export async function POST(request: NextRequest) {
    try {
        await connect(); // Ensure the database is connected
        
        const reqBody = await request.json();
        const { username, specialization, email, password } = reqBody;

        // Check if user already exists
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            specialization,
            email,
            password: hashedPassword,
        });

        // Save user to the database
        const savedUser = await newUser.save();

        // Send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser,
        });
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
