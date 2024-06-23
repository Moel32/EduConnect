import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    specialization: {
        type: String,
        required: [true, "Please provide your specialization"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    avatar: {
        type: String,
        default: "/images/defaultAvatar.png",
    },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
