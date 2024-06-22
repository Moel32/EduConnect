// pages/api/feedback.ts

import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../dbConfig/dbConfig';
import FeedbackModel from '../../../models/videoFeedback';

export async function POST(request: NextRequest) {
    try {
        await connect(); // Ensure MongoDB connection is established

        const { videoId, rating, comment } = await request.json();

        // Create new feedback document
        const newFeedback = new FeedbackModel({
            videoId,
            rating,
            comment,
        });

        // Save feedback to MongoDB
        await newFeedback.save();

        return NextResponse.json({ message: 'Feedback submitted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
