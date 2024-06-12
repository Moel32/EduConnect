import { connect } from "@/dbConfig/dbConfig";
import Comment, { CommentDocument } from "@/models/comments";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const { message, username } = await request.json();
        
        // Create and save the comment with username
        const comment = new Comment({ message, username });
        await comment.save();

        return NextResponse.json({ message: "Comment submitted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
