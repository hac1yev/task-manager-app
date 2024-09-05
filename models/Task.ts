import { model, models, Schema } from "mongoose";
import { User } from "./User";

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: User,
            required: true
        }
    ],
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
    subtask: [
        {
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
        }
    ]
});

export const Task = models.Task || model("Task", TaskSchema);