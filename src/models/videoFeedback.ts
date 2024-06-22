import mongoose, { Schema, Document } from 'mongoose';

export interface FeedbackDocument extends Document {
    videoId: string;
    rating: number;
    comment: string;
}

const feedbackSchema = new Schema({
    videoId: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
});

const Feedback = mongoose.models.Feedback || mongoose.model<FeedbackDocument>('Feedback', feedbackSchema);

export default Feedback;
