import mongoose, { Document, Model } from 'mongoose';

// Define the interface for the comment
interface CommentAttributes {
    message: string;
    username: string; // Add the username field
}

// Define the document interface for the comment
export interface CommentDocument extends Document, CommentAttributes {}

// Define the static methods interface for the comment model
interface CommentModel extends Model<CommentDocument> {}

// Define the schema for the comment
const commentSchema = new mongoose.Schema<CommentDocument, CommentModel>(
    {
        message: {
            type: String,
            required: true,
        },
        username: { // Define the username field in the schema
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Add createdAt and updatedAt fields automatically
    }
);

// Create the Comment model
const Comment = mongoose.models.Comment || mongoose.model<CommentDocument, CommentModel>('Comment', commentSchema);

export default Comment;
