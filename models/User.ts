import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    avatar: {
        type: String
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    biography: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export const User = models.User || model("User", UserSchema);