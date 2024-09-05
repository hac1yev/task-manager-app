import { model, models, Schema } from "mongoose";
import { User } from "./User";

const UsersInTaskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    }
});

const SubtaskInTaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    tag: {
        type: String,
        required: true
    }
});

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    users: [UsersInTaskSchema],
    stage: {
        type: String,
        required: true
    },
    priority_level: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    subtask: [SubtaskInTaskSchema]
});

export const Task = models.Task || model("Task", TaskSchema);