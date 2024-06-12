import mongoose, { Document, Schema } from 'mongoose';

interface IComment extends Document {
    user: string;
    comment: string;
    replies?: IComment[];
}

interface IReview extends Document {
    user: string;
    rating: number;
    comment: string;
}

interface ICourse extends Document {
    name: string;
    description: string;
    price: number;
    thumbnail: string;
    tags: string[];
    level: string;
    demoUrl: string;
    benefits: string[];
    prerequisites: string[];
    reviews: IReview[];
    videoUrl: string;
    videoThumbnail: string;
    videoLength: number;
    ratings: number;
    purchased: number;
}

const commentSchema = new Schema<IComment>({
    user: { type: String, required: true },
    comment: { type: String, required: true },
    replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

const reviewSchema = new Schema<IReview>({
    user: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
});

const courseSchema = new Schema<ICourse>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    tags: [{ type: String, required: true }],
    level: { type: String, required: true },
    demoUrl: { type: String, required: true },
    benefits: [{ type: String, required: true }],
    prerequisites: [{ type: String, required: true }],
    reviews: [reviewSchema],
    videoUrl: { type: String, required: true },
    videoThumbnail: { type: String, required: true },
    videoLength: { type: Number, required: true },
    ratings: { type: Number, default: 0 },
    purchased: { type: Number, default: 0 },
});

const CourseModel = mongoose.model<ICourse>('Course', courseSchema);
const CommentModel = mongoose.model<IComment>('Comment', commentSchema);
const ReviewModel = mongoose.model<IReview>('Review', reviewSchema);

export { CourseModel, CommentModel, ReviewModel };
