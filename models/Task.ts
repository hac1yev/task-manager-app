import { model, models, Schema } from "mongoose";
import { User } from "./User";

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    stage: {
        type: String,
        required: true
    },
    priority_level: {
        type: String,
        required: true
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: User,
            required: true
        }
    ],
    subtask: [
        {
            title: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            },
            tag: {
                type: String,
                required: true
            }
        }
    ],
    comments: [
        {
            fullName: {
                type: String,
            },
            description: {
                type: String,
            },
            adding_at: {
                type: Date,
                default: Date.now
            },
            responses: [
                {
                    fullName: {
                        type: String
                    },
                    description: {
                        type: String,
                    },
                    adding_at: {
                        type: Date,
                        default: Date.now
                    },
                }
            ]
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

export const Task = models.Task || model("Task", TaskSchema);