import { model, models, Schema } from "mongoose";
import { User } from "./User";

const NotificationSchema = new Schema({
    userId: [
        {
            type: Schema.Types.ObjectId,
            ref: User,
        }
    ],
    fullName: {
        type: String,
    },
    type: { 
        type: String, 
        enum: ['deleteTask', 'addUser', 'editTask', 'duplicateTask', 'likeComment', 'assignTask', 'addComment', 'replyComment'], 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    taskId: { 
        type: String,  
    },
    isReadUsers: [
        {
            type: Schema.Types.ObjectId,
            ref: User
        }
    ],
    visibility: { 
        type: String, 
        enum: ['public', 'private'], 
        default: 'private' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

export const Notification = models.Notification || model('Notification', NotificationSchema);